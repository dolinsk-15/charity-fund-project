import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    try {
      await axios.post('http://localhost:8000/api/auth/send-code/', {
        phone_number: phoneNumber,
      });
      setIsCodeSent(true);
    } catch (error) {
      alert('Failed to send verification code.');
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/verify-code/', {
        phone_number: phoneNumber,
        code: verificationCode,
      });
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      localStorage.setItem('userId', response.data.user_id);
      navigate('/home');
    } catch (error) {
      alert('Verification failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Charity Fund Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          {!isCodeSent ? (
            <div className="space-y-4">
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button className="w-full" onClick={handleSendCode}>
                Send Verification Code
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Enter verification code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
              />
              <Button className="w-full" onClick={handleVerify}>
                Verify Code
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
