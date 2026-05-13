import React from 'react';
import { Typography, Box, Divider } from '@mui/material';

const Settings = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>⚙️ 설정 페이지</Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body1">
        사용자 정보 수정이나 알림 설정을 여기서 관리하세요.
      </Typography>
    </Box>
  );
};

export default Settings;