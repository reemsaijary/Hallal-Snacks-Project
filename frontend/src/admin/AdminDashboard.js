import React, { useEffect, useState } from 'react';
import { 
  Box, Container, Grid, Paper, Typography, Card, CardContent, IconButton, 
  Button, Tab, Tabs, TextField, Dialog, DialogTitle, DialogContent, 
  DialogActions, MenuItem, AppBar, Toolbar, Avatar,
  GlobalStyles 
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { 
  Delete, Edit, AddCircle, Assessment, ReceiptLong, 
  Fastfood, CloudUpload, TrendingUp, ExitToApp, AdminPanelSettings 
} from '@mui/icons-material';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from 'recharts'; 

import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const [tab, setTab] = useState(0);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({ totalUsers: 0, dailyOrders: 0, categories: [], topItems: [] });
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({ name: '', price: '', ingredients: '', image_url: '', category: '' });
  const [imageFile, setImageFile] = useState(null);

  const categories = ["ChickenBurger", "BeefBurger", "Sandwiches", "Fries"];
  const COLORS = ['#3f51b5', '#f50057', '#00e676', '#ff9100'];

  const refreshData = async () => {
    try {
      const [resProd, resOrders, resAnlyt] = await Promise.all([
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/admin/orders'),
        axios.get('http://localhost:5000/api/admin/analytics')
      ]);
      setProducts(resProd.data);
      setOrders(resOrders.data);
      setAnalytics(resAnlyt.data);
    } catch (err) { console.error(err); }
  };

  useEffect(() => { refreshData(); }, []);

  const handleSave = async () => {
    let finalImageUrl = selectedProduct.image_url;
    if (imageFile) {
      const formData = new FormData();
      formData.append('image', imageFile);
      try {
        const uploadRes = await axios.post('http://localhost:5000/api/admin/upload', formData);
        finalImageUrl = uploadRes.data.imageUrl;
      } catch (err) { alert("Upload failed!"); return; }
    }
    const payload = { ...selectedProduct, image_url: finalImageUrl };
    if (selectedProduct.id) {
      await axios.put(`http://localhost:5000/api/admin/products/${selectedProduct.id}`, payload);
    } else {
      await axios.post('http://localhost:5000/api/admin/products', payload);
    }
    setOpen(false); setImageFile(null); refreshData();
  };

  return (
    <Box sx={{ bgcolor: '#f0f2f5', minHeight: '100vh' }}>
      <GlobalStyles styles={{ body: { margin: 0 }, html: { margin: 0 } }} />

      <AppBar position="sticky" sx={{ bgcolor: '#1a227e71' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
             <AdminPanelSettings /> Hallal Snacks Admin
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">Welcome, Admin</Typography>
            <Avatar sx={{ bgcolor: '#3f51b5', border: '2px solid white' }}>A</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ pt: 4, pb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 900, color: '#1a237e' }}>Dashboard </Typography>
            <Button component={Link} to="/" startIcon={<ExitToApp />} sx={{ textTransform: 'none', fontWeight: 'bold' }}>
                Return to Shop
            </Button>
          </Box>
          <Button variant="contained" startIcon={<AddCircle />} onClick={() => { setSelectedProduct({ name: '', price: '', ingredients: '', image_url: '', category: '' }); setOpen(true); }}
            sx={{ borderRadius: 3, fontWeight: 'bold', bgcolor: '#1a237e' }}>
            New Snack
          </Button>
        </Box>
        
        <Paper sx={{ borderRadius: 4, mb: 4, overflow: 'hidden' }}>
          <Tabs value={tab} onChange={(e, v) => setTab(v)} indicatorColor="primary" textColor="primary">
            <Tab icon={<Assessment />} label="OVERVIEW" sx={{ fontWeight: 'bold' }} />
            <Tab icon={<ReceiptLong />} label="ORDERS" sx={{ fontWeight: 'bold' }} />
            <Tab icon={<Fastfood />} label="MENU" sx={{ fontWeight: 'bold' }} />
          </Tabs>
        </Paper>

        {tab === 0 && (
          <Grid container spacing={3}>
            {/* Cards */}
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 5, background: 'linear-gradient(135deg, #1a237e 0%, #3f51b5 100%)', color: '#fff' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ opacity: 0.8 }}>TOTAL USERS</Typography>
                  <Typography variant="h2" sx={{ fontWeight: 900 }}>{analytics.totalUsers}</Typography>
                  <TrendingUp sx={{ mt: 2, fontSize: 30 }} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ borderRadius: 5, background: 'linear-gradient(135deg, #2e7d32 0%, #4caf50 100%)', color: '#fff' }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ opacity: 0.8 }}>TODAY'S ORDERS</Typography>
                  <Typography variant="h2" sx={{ fontWeight: 900 }}>{analytics.dailyOrders}</Typography>
                  <ReceiptLong sx={{ mt: 2, fontSize: 30 }} />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 5, height: '100%' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, color: '#1a237e' }}>Top Sellers</Typography>
                {analytics.topItems?.map((item, i) => (
                    <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, p: 1.5, borderRadius: 3, bgcolor: '#f8f9fa' }}>
                      <Typography variant="body1">{item.name}</Typography>
                      <Typography variant="body1" sx={{ fontWeight: 900 }}>{item.total_ordered}</Typography>
                    </Box>
                ))}
              </Paper>
            </Grid>

            {/* Menu Distribution Bar Chart */}
            <Grid item xs={12}>
              <Paper sx={{ p: 4, borderRadius: 5 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Menu Distribution</Typography>
                <Box sx={{ height: 350, width: '100%' }}>
                  <ResponsiveContainer>
                    <BarChart data={analytics.categories}>
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" radius={[10, 10, 0, 0]}>
                        {analytics.categories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {tab === 1 && (
          <Paper sx={{ borderRadius: 5, overflow: 'hidden', height: 600 }}>
                <DataGrid 
                    rows={orders} 
                    getRowId={(r) => r.order_id} 
                    columns={[
                        { field: 'order_id', headerName: 'ID', width: 90 },
                        { field: 'user_email', headerName: 'Customer', width: 250 },
                        { field: 'items', headerName: 'Ordered Snacks', width: 450, renderCell: (p) => JSON.parse(p.value).map(i => `${i.name} (x${i.quantity})`).join(', ') },
                        { field: 'total_price', headerName: 'Total ($)', width: 130 },
                        { field: 'created_at', headerName: 'Date', width: 220, valueFormatter: (p) => new Date(p.value).toLocaleString() }
                    ]}
                />
          </Paper>
        )}

        {tab === 2 && (
          <Box>
            {categories.map(cat => (
              <Paper key={cat} sx={{ p: 4, mb: 4, borderRadius: 5 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 900 }}>{cat.toUpperCase()}</Typography>
                <Box sx={{ height: 350 }}>
                  <DataGrid 
                    rows={products.filter(p => p.category === cat)} 
                    columns={[
                        { field: 'name', headerName: 'Item Name', width: 250 },
                        { field: 'price', headerName: 'Price ($)', width: 150 },
                        { field: 'actions', headerName: 'Control', width: 150, renderCell: (params) => (
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <IconButton onClick={() => { setSelectedProduct(params.row); setOpen(true); }} color="primary"><Edit /></IconButton>
                              <IconButton onClick={() => { if(window.confirm("Delete?")) axios.delete(`http://localhost:5000/api/admin/products/${params.row.id}`).then(refreshData) }} color="error"><Delete /></IconButton>
                            </Box>
                        )}
                    ]}
                  />
                </Box>
              </Paper>
            ))}
          </Box>
        )}

 <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs" PaperProps={{ sx: { borderRadius: 4, p: 2 } }}>
  <DialogTitle sx={{ fontWeight: 900, color: '#1a237e', textAlign: 'center', fontSize: '1.4rem' }}>
    {selectedProduct.id ? '🛠 Edit Snack' : '✨ Add New Snack'}
  </DialogTitle>
  
  <DialogContent>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
      {/* Name */}
      <TextField 
        fullWidth 
        label="Snack Name" 
        variant="outlined" 
        value={selectedProduct.name} 
        onChange={(e) => setSelectedProduct({...selectedProduct, name: e.target.value})} 
      />

      {/* Price */}
      <TextField 
        fullWidth 
        label="Price ($)" 
        type="number" 
        variant="outlined" 
        value={selectedProduct.price} 
        onChange={(e) => setSelectedProduct({...selectedProduct, price: e.target.value})} 
      />

      {/* Ingredients */}
      <TextField 
        fullWidth 
        label="Ingredients" 
        multiline 
        rows={3} 
        variant="outlined" 
        value={selectedProduct.ingredients} 
        onChange={(e) => setSelectedProduct({...selectedProduct, ingredients: e.target.value})} 
      />

      {/* Category Select */}
      <TextField 
        select 
        fullWidth 
        label="Category" 
        value={selectedProduct.category} 
        onChange={(e) => setSelectedProduct({...selectedProduct, category: e.target.value})}
      >
        {categories.map((opt) => (
          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
        ))}
      </TextField>
      
      {/* Upload Button */}
      <Button 
        variant="outlined" 
        component="label" 
        fullWidth 
        startIcon={<CloudUpload />} 
        sx={{ 
          py: 1.5, 
          borderStyle: 'dashed', 
          borderWidth: 2, 
          borderRadius: 2,
          color: imageFile ? '#2e7d32' : '#1a237e',
          borderColor: imageFile ? '#2e7d32' : '#ccc'
        }}
      >
        {imageFile ? "PHOTO SELECTED ✅" : "UPLOAD PRODUCT IMAGE"}
        <input type="file" hidden onChange={(e) => setImageFile(e.target.files[0])} />
      </Button>

      {imageFile && (
        <Typography variant="caption" sx={{ textAlign: 'center', color: '#2e7d32', fontWeight: 'bold' }}>
          File: {imageFile.name}
        </Typography>
      )}
    </Box>
  </DialogContent>

  <DialogActions sx={{ px: 3, pb: 3, flexDirection: 'column', gap: 1 }}>
    <Button 
      fullWidth
      onClick={handleSave} 
      variant="contained" 
      sx={{ 
        bgcolor: '#1a237e', 
        py: 1.5, 
        fontWeight: 'bold', 
        borderRadius: 2,
        '&:hover': { bgcolor: '#0d1440' }
      }}
    >
      Save Product
    </Button>
    <Button 
      fullWidth
      onClick={() => setOpen(false)} 
      sx={{ fontWeight: 'bold', color: 'grey.600' }}
    >
      Cancel
    </Button>
  </DialogActions>
</Dialog>
      </Container>
    </Box>
  );
}