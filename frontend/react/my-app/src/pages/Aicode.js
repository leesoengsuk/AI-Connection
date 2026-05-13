import React from 'react';
import { Typography, Box, Divider, Grid, Paper, LinearProgress } from '@mui/material';

//화면 script 
const Aicode = () => {

    //임시 데이터 
    const metrics = [
        { label: '코드 복잡도', score: 75, color: '#3b82f6', icon: '🧩' },
        { label: '실행 효율성', score: 90, color: '#10b981', icon: '⚡' },
        { label: '유지 보수성', score: 60, color: '#f59e0b', icon: '🛠️' },
        { label: '보안성', score: 95, color: '#ef4444', icon: '🔒' },
    ]
    return (
          <Box sx={{ p: 4, bgcolor: '#f8fafc', minHeight: '100vh' }}>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
                📊 AI 코드 분석 리포트
            </Typography>

            <Grid container spacing={3}>
                {/* 메인 종합 점수판 */}
                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 4, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="h6" color="textSecondary">종합 점수</Typography>
                        <Box sx={{ 
                            my: 3, width: 180, height: 180, borderRadius: '50%', 
                            border: '12px solid #2563eb', display: 'flex', 
                            alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(37, 99, 235, 0.2)'
                        }}>
                            <Typography variant="h2" sx={{ fontWeight: 'bold', color: '#2563eb' }}>85</Typography>
                        </Box>
                        <Typography variant="body1" sx={{ color: '#059669', fontWeight: 'medium' }}>
                            "전반적으로 우수한 코드입니다!"
                        </Typography>
                    </Paper>
                </Grid>

                {/* 세부 지표 리스트 */}
                <Grid item xs={12} md={8}>
                    <Grid container spacing={2}>
                        {metrics.map((item, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                                <Paper sx={{ p: 3, borderRadius: 3 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                            {item.icon} {item.label}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: item.color }}>
                                            {item.score}점
                                        </Typography>
                                    </Box>
                                    <LinearProgress 
                                        variant="determinate" 
                                        value={item.score} 
                                        sx={{ 
                                            height: 10, borderRadius: 5, bgcolor: '#e2e8f0',
                                            '& .MuiLinearProgress-bar': { bgcolor: item.color }
                                        }} 
                                    />
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                    
                    {/* AI 요약 한 줄 */}
                    <Paper sx={{ mt: 3, p: 3, borderRadius: 3, bgcolor: '#eff6ff', border: '1px solid #bfdbfe' }}>
                        <Typography variant="body1" sx={{ color: '#1e40af' }}>
                            💡 <b>AI 인사이트:</b> 현재 코드의 보안성은 매우 뛰어나지만, <b>유지 보수성</b> 점수가 상대적으로 낮습니다. 복잡한 조건문을 함수로 분리하면 점수를 더 높일 수 있어요!
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Aicode;

