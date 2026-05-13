import React, { useEffect, useState } from 'react';

// MUI 부품들 가져오기
import { Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//화면 script 
const Home = () => {
    // 데이터를 담을 바구니(state)를 만듭니다.
    const [boardList, setBoardList] = useState([]);

    // 입력 필드 상태 관리 aireview 통합 
    const [inputs, setInputs] = useState({ title: '', content: '', author: '', aiReview: '' });
    const [loading, setLoading] = useState(false);

    const isReadyToAnlyze = () => {
    
         return inputs.title && inputs.author && inputs.content;

    }
    const isReadyToSave = () => {
        // 위에서 만든 함수를 안에서 또 써도 됩니다.
        return isReadyToAnlyze() && inputs.aiReview?.trim();
    }; 
    
    const fetchBoards = () => {
        // 1. 이클립스(Spring Boot) 서버에 데이터를 달라고 요청합니다.
        fetch("http://localhost:8080/api/board")
            .then(res => res.json())
            .then(data =>
                setBoardList(data)) // 받은 데이터를 바구니에 담습니다.
            .catch(error => console.error("에러 발생:", error));
    };// 처음에 화면이 뜰 때 딱 한 번만 실행합니다.

     console.log("분석 버튼 활성화 여부:", isReadyToAnlyze);

    //AI 분석 함수 추가 
    const onAnalyze = () => {
        
        if (!isReadyToAnlyze) return;
        setLoading(true);
       
        fetch("http://localhost:8080/api/board/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ content: inputs.content })
        })
            .then(res => {
                if (!res.ok) throw new Error("서버 응답 에러");
                return res.json();
            })
            .then(data => {
               // setAiResult(data.analysis);
                setInputs(prev => ({...prev, aiReview: data.analyze}));
                setLoading(false);
                alert("AI 분석이 완료되었습니다. 이제 저장할 수 있습니다.");
            })
            .catch(err => {
                console.error("AI 요청 실패:", err);
                setLoading(false);
            });
    };

    // 화면 켜지자마자 실행 
    useEffect(() => { fetchBoards(); }, []);

    // [B] 입력창 글자 바뀔 때마다 실행
    const onChange = (e) => {

         const { name, value } = e.target;
        // aiReview는 직접 수정을 막기 위해 제외하거나, 로직상 유지
        setInputs({ ...inputs, [name]: value });
        console.log("현재 입력 상태:", inputs);
    };

    // [C] 저장 버튼 클릭 시 실행 (입력용)
    const onSave = () => {
        if (!inputs.title || !inputs.author) return alert("제목과 작성자는 필수 입니다.");

        const method = inputs.id ? "PUT" : "POST"
        const url = inputs.id ? `http://localhost:8080/api/board/${inputs.id}` : "http://localhost:8080/api/board";

        fetch(url, {
            // method: "POST",
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)
        })
            .then(res => res.json())
            .then(() => {
                alert("DB 저장 성공");
                setInputs({ title: '', content: '', author: '' }); // 입력창 비우기
                fetchBoards(); //저장후 리스트 호출
            });
    };

    const onDelete = (id) => {
        if (!window.confirm("진짜 삭제하시겠습니까?")) return;

        fetch(`http://localhost:8080/api/board/${id}`, {
            method: "DELETE" // 데이터를 지울 때는 DELETE!
        })
            .then(() => {
                alert("삭제 완료!");
                fetchBoards(); // 목록 새로고침 (이게 있어야 화면에서 바로 사라집니다)
            })
            .catch(err => console.error("삭제 에러:", err));
    };

    const onEdit = (board) => {
        setInputs({
            id: board.id,
            title: board.title,
            content: board.content,
            author: board.author
        });
    };

    return (
        <Box>
              <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold' }}>💻 코드 리뷰 게시판</Typography>

            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField name="title" label="제목" fullWidth value={inputs.title} onChange={onChange} disabled={loading} />
                    <TextField name="author" label="작성자" fullWidth value={inputs.author} onChange={onChange} disabled={loading} />
                    <TextField 
                        name="content" 
                        label="분석할 코드를 입력하세요" 
                        fullWidth multiline rows={8} 
                        value={inputs.content || ''} 
                        onChange={onChange}
                        disabled={loading}
                        inputProps={{ style: { fontFamily: 'monospace' } }}
                    />

                    {/* AI 분석 결과창 (사용자가 입력/수정 못하게 설정) */}
                    {inputs.aiReview && (
                        <TextField
                            label="🤖 AI 분석 리포트 (수정 불가)"
                            fullWidth multiline
                            value={inputs.aiReview}
                            variant="filled"
                            focused
                            color="secondary"
                            InputProps={{ readOnly: true }}
                            sx={{ bgcolor: '#f0f4f8' }}
                        />
                    )}

                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <Button 
                            variant="outlined" 
                            color="secondary" 
                            fullWidth 
                            onClick={onAnalyze} 
                            disabled={!isReadyToAnlyze() || loading} // 제목, 작성자, 내용 없으면 비활성
                        >
                            {loading ? "AI 분석 중..." : "1. AI 코드 분석하기"}
                        </Button>
                        
                        <Button 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            onClick={onSave} 
                            disabled={!isReadyToSave() || loading} // AI 리뷰 없으면 저장 불가
                        >
                            {inputs.id ? "2. 수정 완료" : "2. 최종 저장하기"}
                        </Button>
                    </Box>
                </Box>
            </Paper>

                    {/* 출력 영역: MUI Table 사용 */}
                    <TableContainer component={Paper} elevation={3}>
                        <Table>
                            <TableHead style={{ backgroundColor: '#1976d2' }}>
                                <TableRow>
                                    <TableCell style={{ color: 'white' }}>번호</TableCell>
                                    <TableCell style={{ color: 'white' }}>제목</TableCell>
                                    <TableCell style={{ color: 'white' }}>작성자</TableCell>
                                    <TableCell style={{ color: 'white' }} align="center">관리</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {boardList.map((b) => (
                                    <TableRow key={b.id} hover>
                                        <TableCell sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f0f7ff' } }} onClick={() => setInputs(b)}>{b.id}</TableCell>
                                        <TableCell sx={{ cursor: 'pointer', '&:hover': { backgroundColor: '#f0f7ff' } }} onClick={() => setInputs(b)}>{b.title}</TableCell>
                                        <TableCell sx={{ cursor: 'pointer' }} onClick={() => setInputs(b)}>{b.author}</TableCell>
                                        <TableCell align="center"><Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => onDelete(b.id)}>삭제</Button></TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

        </Box>
    );
};

export default Home;