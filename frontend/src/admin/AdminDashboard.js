import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Card, CardContent, IconButton, Button, Tab, Tabs, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit, AddCircle, Assessment, ReceiptLong, Fastfood } from '@mui/icons-material';
import axios from 'axios';

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({ totalUsers: 0, dailyOrders: 0, categories: [], topItems: [] });
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ name: '', price: '', ingredients: '', image_url: '', category: '' });

  const refreshData = async () => {
    try {
      const resProd = await axios.get('http://localhost:5000/api/products');
      const resOrders = await axios.get('http://localhost:5000/api/admin/orders');
      const resAnlyt = await axios.get('http://localhost:5000/api/admin/analytics');
      setProducts(resProd.data);
      setOrders(resOrders.data);
      setAnalytics(resAnlyt.data);
    } catch (err) {
      console.error("Error refreshing data:", err);
    }
  };

  useEffect(() => { refreshData(); }, []);

  const handleSave = async () => {
    if (selectedProduct.id) {
      await axios.put(`http://localhost:5000/api/admin/products/${selectedProduct.id}`, selectedProduct);
    } else {
      await axios.post('http://localhost:5000/api/admin/products', selectedProduct);
    }
    setOpen(false);
    refreshData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this snack?")) {
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`);
      refreshData();
    }
  };

  const productCols = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'price', headerName: 'Price ($)', width: 100 },
    { field: 'ingredients', headerName: 'Ingredients', width: 250 },
    {
      field: 'actions', headerName: 'Actions', width: 120,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => { setSelectedProduct(params.row); setOpen(true); }} color="primary"><Edit /></IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)} color="error"><Delete /></IconButton>
        </Box>
      )
    }
  ];

  const categories = ["ChickenBurger", "BeefBurger", "Sandwiches", "Fries"];

  return (
    <Box sx={{ py: 10, bgcolor: '#f8f9fa', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4, color: '#1a237e' }}>Hallal Snacks Admin Control 👨‍🍳</Typography>
        
        <Tabs value={tab} onChange={(e, v) => setTab(v)} sx={{ mb: 4 }}>
          <Tab icon={<Assessment />} label="Analytics" />
          <Tab icon={<ReceiptLong />} label="Orders" />
          <Tab icon={<Fastfood />} label="Menu Management" />
        </Tabs>

        {/* TAB 0: ANALYTICS */}
        {tab === 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}><Card sx={{ bgcolor: '#3f51b5', color: '#fff' }}><CardContent><Typography>Total Users</Typography><Typography variant="h3">{analytics.totalUsers}</Typography></CardContent></Card></Grid>
            <Grid item xs={12} md={4}><Card sx={{ bgcolor: '#4caf50', color: '#fff' }}><CardContent><Typography>Orders Today</Typography><Typography variant="h3">{analytics.dailyOrders}</Typography></CardContent></Card></Grid>
            <Grid item xs={12} md={4}>
              <Card><CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Top 3 Most Required Items</Typography>
                {analytics.topItems.map((item, i) => (
                  <Typography key={i} variant="body1">#{i+1} {item.name} ({item.total_ordered} sales)</Typography>
                ))}
              </CardContent></Card>
            </Grid>
          </Grid>
        )}

        {/* TAB 1: ORDERS HISTORY (FIXED) */}
        {tab === 1 && (
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Customer Orders History</Typography>
            <Box sx={{ height: 600 }}>
              <DataGrid 
                rows={orders} 
                getRowId={(row) => row.order_id} 
                columns={[
                  { field: 'order_id', headerName: 'ID', width: 70 },
                  { field: 'user_email', headerName: 'Customer Email', width: 220 },
                  { 
                    field: 'items', 
                    headerName: 'Items Ordered', 
                    width: 450,
                    renderCell: (params) => {
                      try {
                        const items = JSON.parse(params.value);
                        return items.map(i => `${i.name} (x${i.quantity})`).join(', ');
                      } catch (e) { return "Error parsing items"; }
                    }
                  },
                  { field: 'total_price', headerName: 'Total ($)', width: 120, renderCell: (p) => `$${p.value}` },
                  { field: 'status', headerName: 'Status', width: 120 },
                  { 
                    field: 'created_at', 
                    headerName: 'Order Time', 
                    width: 200, 
                    valueFormatter: (params) => new Date(params.value).toLocaleString() 
                  },
                ]} 
              />
            </Box>
          </Paper>
        )}

        {/* TAB 2: MENU MANAGEMENT */}
        {tab === 2 && (
          <Box>
            <Button variant="contained" startIcon={<AddCircle />} onClick={() => { setSelectedProduct({ name: '', price: '', ingredients: '', image_url: '', category: '' }); setOpen(true); }} sx={{ mb: 3 }}>Add New Item</Button>
            {categories.map(cat => (
              <Paper key={cat} sx={{ p: 2, mb: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, color: '#d32f2f', fontWeight: 'bold' }}>{cat} Section</Typography>
                <Box sx={{ height: 350 }}><DataGrid rows={products.filter(p => p.category === cat)} columns={productCols} /></Box>
              </Paper>
            ))}
          </Box>
        )}

        {/* EDIT/ADD DIALOG (WITH IMAGE FIELD) */}
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
          <DialogTitle>{selectedProduct.id ? 'Update Item' : 'Add New Item'}</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <TextField fullWidth label="Snack Name" value={selectedProduct.name} onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})} sx={{ mb: 2 }} />
            <TextField fullWidth label="Price ($)" value={selectedProduct.price} onChange={(e) => setSelectedProduct({...selectedProduct, price: e.target.value})} sx={{ mb: 2 }} />
            <TextField fullWidth label="Ingredients" multiline rows={3} value={selectedProduct.ingredients} onChange={(e) => setSelectedProduct({...selectedProduct, ingredients: e.target.value})} sx={{ mb: 2 }} />
            <TextField 
              fullWidth 
              label="Image Path (e.g. /assets/Menu-items/Fries/box.jpeg)" 
              value={selectedProduct.image_url} 
              onChange={(e) => setSelectedProduct({...selectedProduct, image_url: e.target.value})} 
              sx={{ mb: 2 }} 
            />
            <TextField fullWidth label="Category" value={selectedProduct.category} helperText="Use: ChickenBurger, BeefBurger, Sandwiches, or Fries" onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained" color="primary">Save Changes</Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
}