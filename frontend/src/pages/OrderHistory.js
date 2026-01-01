import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("hallal_user"));

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/api/orders/${user.email}`)
        .then(res => res.json())
        .then(data => setOrders(data))
        .catch(err => console.log(err));
    }
  }, [user?.email]);

  return (
    <Box sx={{ bgcolor: '#1a1a1a', minHeight: '100vh', pt: 12, pb: 5 }}>
      <Container maxWidth="md">
        <Typography variant="h3" align="center" sx={{ fontWeight: 'bold', color: '#ff6600', mb: 4, textTransform: 'uppercase' }}>
          Your History
        </Typography>

        {orders.length === 0 ? (
          <Paper elevation={0} sx={{ p: 8, textAlign: 'center', borderRadius: 4, bgcolor: '#262626', border: '1px solid #333', color: '#fff' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'medium' }}>
              You haven't placed any orders yet. Go grab some Hallal Snacks items
            </Typography>
            <Button variant="contained" size="large" onClick={() => navigate('/menu')} sx={{ bgcolor: '#ff6600', color: 'white', fontWeight: 'bold', px: 5, py: 1.5, borderRadius: '50px', '&:hover': { bgcolor: '#e65c00' } }}>
              View Menu
            </Button>
          </Paper>
        ) : (
          <Paper sx={{ bgcolor: '#262626', color: '#fff', p: 3, borderRadius: 2, border: '1px solid #333' }}>
            <table className="table table-dark table-hover" style={{ margin: 0 }}>
              <thead>
                <tr style={{ color: '#ff6600' }}>
                  <th style={{ borderBottom: '2px solid #ff6600' }}>Date</th>
                  <th style={{ borderBottom: '2px solid #ff6600' }}>Items</th>
                  <th style={{ borderBottom: '2px solid #ff6600' }} className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.order_id}>
                    <td>{new Date(order.created_at).toLocaleDateString()}</td>
                    <td>
                      {/* JSON.parse converts the items string back to an array */}
                      {JSON.parse(order.items).map(item => `${item.quantity}x ${item.name}`).join(", ")}
                    </td>
                    <td className="text-end" style={{ color: '#ff6600', fontWeight: 'bold' }}>
                      ${Number(order.total_price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Paper>
        )}
      </Container>
    </Box>
  );
}