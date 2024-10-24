
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
// import { HomePageWrapper } from './pages/HomePage';  // Импортируем HomePageWrapper вместо HomePage
import HomePage from './pages/HomePage';

import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;




// function App() {
//   return (
//     <div className="min-h-screen bg-blue-500 flex items-center justify-center">
//       <h1 className="text-3xl text-white font-bold">Testing Tailwind CSS!</h1>
//     </div>
//   );
// }

// export default App;








// import React, { useState, useEffect } from 'react';
// import { Button } from './components/ui/Button';
// import { Input } from './components/ui/Input';
// import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from './components/ui/Dialog';
// import { Checkbox } from './components/ui/Checkbox';
// import { Progress } from './components/ui/Progress';
// import { UserIcon } from 'lucide-react';
// import axios from 'axios';
// // import { loadStripe } from '../stripe/stripe-js';
// // import { Elements, CardElement, useStripe, useElements } from '../stripe/react-stripe-js';

// // const stripePromise = loadStripe('your-publishable-key');

// export default function HomePage() {
//   const [showProfile, setShowProfile] = useState(false);
//   const [showCardModal, setShowCardModal] = useState(false);
//   const [paymentAmount, setPaymentAmount] = useState('');
//   const [isRecurring, setIsRecurring] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [infoText, setInfoText] = useState('');
//   const [fundName, setFundName] = useState('');
//   const [fundGoal, setFundGoal] = useState(0);
//   const userId = localStorage.getItem('userId');
//   const accessToken = localStorage.getItem('accessToken');

//   // const stripe = useStripe();
//   // const elements = useElements();

//   useEffect(() => {
//     axios.get('http://localhost:8000/api/admin/fund-settings/')
//       .then(response => {
//         setInfoText(response.data.info_text);
//         setFundName(response.data.fund_name);
//         setFundGoal(response.data.fund_goal);
//         const progressPercentage = (response.data.total_raised / response.data.fund_goal) * 100;
//         setProgress(progressPercentage);
//       })
//       .catch(error => {
//         console.error('Failed to fetch fund settings:', error);
//       });
//   }, []);

//   const handlePayment = async (e) => {
//     e.preventDefault();
//     setShowCardModal(true);
//   };

//   // Закомментированный код обработки платежа с помощью карты
//   /*
//   const handleCardPayment = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);

//     try {
//       const { paymentMethod } = await stripe.createPaymentMethod({
//         type: 'card',
//         card: cardElement,
//       });

//       await axios.post('http://localhost:8000/api/payments/process/', {
//         user_id: userId,
//         amount: paymentAmount,
//         payment_method_id: paymentMethod.id,
//         is_recurring: isRecurring,
//       }, {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       alert('Payment successful!');
//       setShowCardModal(false);
//     } catch (error) {
//       console.error('Payment failed:', error);
//       alert('Payment failed.');
//     }
//   };
//   */

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold">Charity Fund</h1>
//           <Button variant="ghost" onClick={() => setShowProfile(true)}>
//             <UserIcon className="h-6 w-6" />
//           </Button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           <Card>
//             <CardHeader>
//               <CardTitle>Make a Payment</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handlePayment} className="space-y-4">
//                 <Input
//                   type="number"
//                   placeholder="Amount"
//                   value={paymentAmount}
//                   onChange={(e) => setPaymentAmount(e.target.value)}
//                   required
//                 />
//                 <div className="flex items-center space-x-2">
//                   <Checkbox
//                     id="recurring"
//                     checked={isRecurring}
//                     onCheckedChange={(checked) => setIsRecurring(checked)}
//                   />
//                   <label htmlFor="recurring">Set up auto payment</label>
//                 </div>
//                 <Button type="submit" className="w-full">Pay</Button>
//               </form>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Information</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <p>{infoText}</p>
//             </CardContent>
//           </Card>
//         </div>

//         <Card className="mt-8">
//           <CardHeader>
//             <CardTitle>{fundName}</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Progress value={progress} className="w-full" />
//             <p className="mt-2 text-center">{progress.toFixed(2)}% of the target amount raised</p>
//           </CardContent>
//         </Card>
//       </main>

//       <Dialog open={showProfile} onOpenChange={setShowProfile}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Profile</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <Button className="w-full">Change Phone Number</Button>
//             <Button className="w-full">Change Payment Details</Button>
//             <Button variant="destructive" className="w-full">Delete Account</Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Закомментированный код для привязки карты */}
//       {/*
//       <Dialog open={showCardModal} onOpenChange={setShowCardModal}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Link Card</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={handleCardPayment} className="space-y-4">
//             <CardElement options={{ hidePostalCode: true }} />
//             <Button type="submit" className="w-full">Link and Pay</Button>
//           </form>
//         </DialogContent>
//       </Dialog>
//       */}
//     </div>
//   );
// }

// Закомментированный код обертки HomePage с элементами Stripe
/*
export function HomePageWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <HomePage />
    </Elements>
  );
}
*/



/////////////////////////////////////////////////////



// import React, { useState, useEffect } from 'react';
// import { Button } from './components/ui/Button';
// import { Input } from './components/ui/Input';
// import { Textarea } from './components/ui/Textarea';
// import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
// import { Switch } from './components/ui/Switch';
// // import axios from 'axios'; // Убираем для локальной работы

// export default function AdminPage() {
//   const [fundInfo, setFundInfo] = useState('');
//   const [fundName, setFundName] = useState('');
//   const [fundGoal, setFundGoal] = useState('');
//   const [showProgressBar, setShowProgressBar] = useState(true);
//   // const accessToken = localStorage.getItem('accessToken'); // Не нужен для локального запуска

//   // useEffect(() => {
//   //   // Имитация загрузки данных из API
//   //   axios.get('http://localhost:8000/api/admin/fund-settings/', {
//   //     headers: {
//   //       Authorization: `Bearer ${accessToken}`,
//   //     },
//   //   })
//   //     .then(response => {
//   //       setFundInfo(response.data.info_text);
//   //       setFundName(response.data.fund_name);
//   //       setFundGoal(response.data.fund_goal);
//   //       setShowProgressBar(response.data.show_progress_bar);
//   //     })
//   //     .catch(error => {
//   //       console.error('Failed to fetch fund settings:', error);
//   //     });
//   // }, [accessToken]);

//   // Имитация загрузки данных при монтировании
//   useEffect(() => {
//     // Здесь можно установить данные по умолчанию
//     setFundInfo('Пример информации о фонде');
//     setFundName('Пример имени фонда');
//     setFundGoal('10000');
//     setShowProgressBar(true);
//   }, []);

//   const handleUpdateFundInfo = () => {
//     // Имитация обновления информации о фонде
//     alert('Fund info updated locally: ' + fundInfo);
//   };

//   const handleUpdateFundSettings = () => {
//     // Имитация обновления настроек фонда
//     alert('Fund settings updated locally: ' + JSON.stringify({
//       fund_name: fundName,
//       fund_goal: fundGoal,
//       show_progress_bar: showProgressBar,
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <Card>
//           <CardHeader>
//             <CardTitle>Update Fund Information</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Textarea
//               placeholder="Enter fund information"
//               value={fundInfo}
//               onChange={(e) => setFundInfo(e.target.value)}
//               className="mb-4"
//             />
//             <Button onClick={handleUpdateFundInfo} className="w-full">
//               Update Fund Info
//             </Button>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader>
//             <CardTitle>Manage Fund Settings</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Input
//               placeholder="Fund name"
//               value={fundName}
//               onChange={(e) => setFundName(e.target.value)}
//               className="mb-4"
//             />
//             <Input
//               type="number"
//               placeholder="Fundraising goal"
//               value={fundGoal}
//               onChange={(e) => setFundGoal(e.target.value)}
//               className="mb-4"
//             />
//             <div className="flex items-center justify-between mb-4">
//               <span>Show progress bar</span>
//               <Switch
//                 checked={showProgressBar}
//                 onCheckedChange={setShowProgressBar}
//               />
//             </div>
//             <Button onClick={handleUpdateFundSettings} className="w-full">
//               Update Fund Settings
//             </Button>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
