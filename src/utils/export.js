// Export to CSV
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Get headers from first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  let csvContent = headers.join(',') + '\n';
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      // Handle values with commas or quotes
      if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csvContent += values.join(',') + '\n';
  });

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export orders to CSV
export const exportOrders = (orders) => {
  const exportData = orders.map(order => ({
    'Order ID': order.id,
    'Order Name': order.name,
    'Customer': order.customerName || 'N/A',
    'From': order.from,
    'To': order.to,
    'Weight (kg)': order.height,
    'Price ($)': order.price,
    'Status': order.status || 'pending',
    'Driver': order.driverName || 'Not assigned',
    'Created At': new Date(order.createdAt).toLocaleString(),
    'Delivered At': order.deliveredAt ? new Date(order.deliveredAt).toLocaleString() : 'N/A'
  }));

  exportToCSV(exportData, `orders_${new Date().toISOString().split('T')[0]}.csv`);
};

// Export users to CSV
export const exportUsers = (users) => {
  const exportData = users.map(user => ({
    'User ID': user.id,
    'Name': user.name,
    'Email': user.email,
    'Role': user.role,
    'Rating': user.rating || 'N/A',
    'Total Orders': user.totalOrders || 0,
    'Created At': new Date(user.createdAt).toLocaleString()
  }));

  exportToCSV(exportData, `users_${new Date().toISOString().split('T')[0]}.csv`);
};

// Export statistics to CSV
export const exportStatistics = (stats) => {
  const exportData = [{
    'Metric': 'Total Orders',
    'Value': stats.total
  }, {
    'Metric': 'Pending Orders',
    'Value': stats.pending
  }, {
    'Metric': 'In Progress Orders',
    'Value': stats.inProgress
  }, {
    'Metric': 'Delivered Orders',
    'Value': stats.delivered
  }, {
    'Metric': 'Total Revenue ($)',
    'Value': stats.totalRevenue.toFixed(2)
  }, {
    'Metric': 'Average Order Value ($)',
    'Value': (stats.totalRevenue / stats.total).toFixed(2)
  }];

  exportToCSV(exportData, `statistics_${new Date().toISOString().split('T')[0]}.csv`);
};

// Print orders (for PDF-like printing)
export const printOrders = (orders) => {
  const printWindow = window.open('', '_blank');
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Orders Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
        }
        h1 {
          color: #333;
          border-bottom: 2px solid #667eea;
          padding-bottom: 10px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 12px;
          text-align: left;
        }
        th {
          background-color: #667eea;
          color: white;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .status {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
        }
        .pending { background: #fef3c7; color: #92400e; }
        .in-progress { background: #dbeafe; color: #1e40af; }
        .delivered { background: #d1fae5; color: #065f46; }
        @media print {
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <h1>Orders Report</h1>
      <p>Generated on: ${new Date().toLocaleString()}</p>
      <p>Total Orders: ${orders.length}</p>
      
      <table>
        <thead>
          <tr>
            <th>Order Name</th>
            <th>Customer</th>
            <th>Route</th>
            <th>Weight</th>
            <th>Price</th>
            <th>Status</th>
            <th>Driver</th>
          </tr>
        </thead>
        <tbody>
          ${orders.map(order => `
            <tr>
              <td>${order.name}</td>
              <td>${order.customerName || 'N/A'}</td>
              <td>${order.from} → ${order.to}</td>
              <td>${order.height} kg</td>
              <td>$${order.price}</td>
              <td><span class="status ${order.status || 'pending'}">${order.status || 'pending'}</span></td>
              <td>${order.driverName || 'Not assigned'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <button onclick="window.print()" style="margin-top: 20px; padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">
        Print / Save as PDF
      </button>
    </body>
    </html>
  `;
  
  printWindow.document.write(html);
  printWindow.document.close();
};