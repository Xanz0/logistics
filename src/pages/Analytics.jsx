import { useState, useEffect } from 'react';
import { fetchOrders } from '../utils/api';
import '../styles/analytics.css';

export default function Analytics({ userId, userRole }) {
  const [stats, setStats] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [userId]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const orders = await fetchOrders();
      
      // Filter orders based on user role
      let userOrders = orders;
      if (userRole === 'customer') {
        userOrders = orders.filter(o => o.customerId === userId);
      } else if (userRole === 'driver') {
        userOrders = orders.filter(o => o.driverId === userId);
      }

      // Calculate statistics
      const totalOrders = userOrders.length;
      const pending = userOrders.filter(o => o.status === 'pending').length;
      const inProgress = userOrders.filter(o => o.status === 'in-progress').length;
      const delivered = userOrders.filter(o => o.status === 'delivered').length;
      const totalRevenue = userOrders.reduce((sum, o) => sum + (parseFloat(o.price) || 0), 0);
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Calculate completion rate
      const completionRate = totalOrders > 0 ? (delivered / totalOrders) * 100 : 0;

      // Group by month for chart
      const monthlyData = {};
      userOrders.forEach(order => {
        const date = new Date(order.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        
        if (!monthlyData[monthKey]) {
          monthlyData[monthKey] = { orders: 0, revenue: 0 };
        }
        
        monthlyData[monthKey].orders++;
        monthlyData[monthKey].revenue += parseFloat(order.price) || 0;
      });

      const chartArray = Object.entries(monthlyData)
        .sort()
        .map(([month, data]) => ({
          month,
          orders: data.orders,
          revenue: data.revenue
        }));

      setStats({
        totalOrders,
        pending,
        inProgress,
        delivered,
        totalRevenue,
        avgOrderValue,
        completionRate
      });
      
      setChartData(chartArray);
    } catch (error) {
      console.error('Analytics error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="analytics-loading">Loading analytics...</div>;
  }

  if (!stats) {
    return <div className="analytics-error">Failed to load analytics</div>;
  }

  return (
    <div className="analytics-container">
      <h2>📊 Analytics & Statistics</h2>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">📦</div>
          <div className="metric-value">{stats.totalOrders}</div>
          <div className="metric-label">Total Orders</div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">💰</div>
          <div className="metric-value">${stats.totalRevenue.toFixed(2)}</div>
          <div className="metric-label">Total Revenue</div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📈</div>
          <div className="metric-value">${stats.avgOrderValue.toFixed(2)}</div>
          <div className="metric-label">Avg Order Value</div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">✅</div>
          <div className="metric-value">{stats.completionRate.toFixed(1)}%</div>
          <div className="metric-label">Completion Rate</div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="status-distribution">
        <h3>Order Status Distribution</h3>
        <div className="status-bars">
          <div className="status-bar-item">
            <div className="status-bar-label">
              <span>Pending</span>
              <strong>{stats.pending}</strong>
            </div>
            <div className="status-bar-bg">
              <div 
                className="status-bar-fill pending-bar"
                style={{ width: `${stats.totalOrders > 0 ? (stats.pending / stats.totalOrders) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="status-bar-item">
            <div className="status-bar-label">
              <span>In Progress</span>
              <strong>{stats.inProgress}</strong>
            </div>
            <div className="status-bar-bg">
              <div 
                className="status-bar-fill progress-bar"
                style={{ width: `${stats.totalOrders > 0 ? (stats.inProgress / stats.totalOrders) * 100 : 0}%` }}
              />
            </div>
          </div>

          <div className="status-bar-item">
            <div className="status-bar-label">
              <span>Delivered</span>
              <strong>{stats.delivered}</strong>
            </div>
            <div className="status-bar-bg">
              <div 
                className="status-bar-fill delivered-bar"
                style={{ width: `${stats.totalOrders > 0 ? (stats.delivered / stats.totalOrders) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Chart */}
      {chartData.length > 0 && (
        <div className="monthly-chart">
          <h3>Monthly Overview</h3>
          <div className="chart-bars">
            {chartData.map((data, idx) => {
              const maxRevenue = Math.max(...chartData.map(d => d.revenue));
              const height = (data.revenue / maxRevenue) * 100;
              
              return (
                <div key={idx} className="chart-bar-item">
                  <div className="chart-bar-wrapper">
                    <div 
                      className="chart-bar"
                      style={{ height: `${height}%` }}
                      title={`$${data.revenue.toFixed(2)}`}
                    />
                  </div>
                  <div className="chart-label">
                    <div className="chart-month">{data.month.split('-')[1]}/{data.month.split('-')[0].slice(2)}</div>
                    <div className="chart-count">{data.orders} orders</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}