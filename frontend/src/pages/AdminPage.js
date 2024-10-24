import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Textarea } from '../components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Switch } from '../components/ui/Switch';
import axios from 'axios';

export default function AdminPage() {
  const [fundInfo, setFundInfo] = useState('');
  const [fundName, setFundName] = useState('');
  const [fundGoal, setFundGoal] = useState('');
  const [showProgressBar, setShowProgressBar] = useState(true);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    axios.get('http://localhost:8000/api/admin/fund-settings/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(response => {
        setFundInfo(response.data.info_text);
        setFundName(response.data.fund_name);
        setFundGoal(response.data.fund_goal);
        setShowProgressBar(response.data.show_progress_bar);
      })
      .catch(error => {
        console.error('Failed to fetch fund settings:', error);
      });
  }, [accessToken]);

  const handleUpdateFundInfo = () => {
    axios.post('http://localhost:8000/api/admin/update-info/', {
      info_text: fundInfo,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(() => {
      alert('Fund info updated.');
    })
    .catch(error => {
      alert('Failed to update fund info.');
    });
  };

  const handleUpdateFundSettings = () => {
    axios.post('http://localhost:8000/api/admin/update-settings/', {
      fund_name: fundName,
      fund_goal: fundGoal,
      show_progress_bar: showProgressBar,
    }, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then(() => {
      alert('Fund settings updated.');
    })
    .catch(error => {
      alert('Failed to update fund settings.');
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Update Fund Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter fund information"
              value={fundInfo}
              onChange={(e) => setFundInfo(e.target.value)}
              className="mb-4"
            />
            <Button onClick={handleUpdateFundInfo} className="w-full">Update Fund Info</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Fund Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Fund name"
              value={fundName}
              onChange={(e) => setFundName(e.target.value)}
              className="mb-4"
            />
            <Input
              type="number"
              placeholder="Fundraising goal"
              value={fundGoal}
              onChange={(e) => setFundGoal(e.target.value)}
              className="mb-4"
            />
            <div className="flex items-center justify-between mb-4">
              <span>Show progress bar</span>
              <Switch
                checked={showProgressBar}
                onCheckedChange={setShowProgressBar}
              />
            </div>
            <Button onClick={handleUpdateFundSettings} className="w-full">Update Fund Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
