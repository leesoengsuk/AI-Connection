import React, { useEffect, useState } from 'react';

// MUI 부품들 가져오기
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Sidebar from './components/Sidebar';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'; // 미리 만들어둘 페이지 컴포넌트들
import Settings from './pages/Settings';
import Aicode from './pages/Aicode';


function App() {
  
 return (

    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Router>
        <Box sx={{ display: 'flex' }}>
        {/* 2. 왼쪽 사이드바 고정 */}
        <Sidebar />
       <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Container maxWidth="md">
        
         {/* 4. 실제 페이지가 갈아끼워지는 영역 */}
            <Routes>
              {/* 메인 경로(/)에서 기존 게시판 로직을 보여주고 싶다면 아래처럼 설정 */}
              <Route path="/" element={<Home />} /> 
              <Route path="/aicode" element={<Aicode  />} /> 
              <Route path="/settings" element={<Settings />} />
            </Routes>
            </Container>
           </Box>
        </Box>
      </Router>
  </Container>
  );
}

export default App;