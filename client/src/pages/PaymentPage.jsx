import { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaLock } from 'react-icons/fa';
import Button from '../components/Button.jsx';
import Input from '../components/Input.jsx';
import Loader from '../components/Loader.jsx';
import Modal from '../components/Modal.jsx';
import { getErrorMessage } from '../services/api.js';
import { processPayment } from '../services/paymentService.js';

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    doctorId,
    appointmentDate,
    appointmentTime,
    doctorName,
    doctorFee
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [submitting, setSubmitting] = useState(false);

  const [cardForm, setCardForm] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: ''
  });

  const [upiId, setUpiId] = useState('');

  const [successOpen, setSuccessOpen] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  const fee = useMemo(() => doctorFee ?? 0, [doctorFee]);

  const onPay = async (event) => {
    event.preventDefault();

    if (!doctorId || !appointmentDate || !appointmentTime) {
      toast.error('Missing appointment data. Please go back and try again.');
      return;
    }

    if (paymentMethod === 'UPI' && !upiId.trim()) {
      toast.error('UPI ID is required');
      return;
    }

    if (paymentMethod !== 'UPI') {
      if (!cardForm.cardNumber.trim()) return toast.error('Card Number is required');
      if (!cardForm.expiryDate.trim()) return toast.error('Expiry Date is required');
      if (!cardForm.cvv.trim()) return toast.error('CVV is required');
      if (!cardForm.cardHolderName.trim()) return toast.error('Card Holder Name is required');
    }

    try {
      setSubmitting(true);

      const payload = {
        doctorId,
        appointmentDate,
        appointmentTime,
        paymentMethod
      };

      // simulate 2-sec on backend as well; keep UX loader here
      const response = await processPayment(payload);
      const data = response.data;

      // controller sends success payload in a standard wrapper
      const tx = data?.data?.transactionId || data?.transactionId || '';

      setTransactionId(tx);
      setSuccessOpen(true);
      toast.success('Payment Successful');

      // Let modal show, then redirect after a short moment
      setTimeout(() => {
        setSuccessOpen(false);
        navigate('/my-appointments');
      }, 2500);
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (!doctorId) {
    return (
      <section className="container-page py-12">
        <div className="panel p-8 text-center">
          <p className="text-slate-300">No payment details found. Please book an appointment first.</p>
          <Button className="mt-4" onClick={() => navigate('/doctors')}>
            Go to Doctors
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="container-page py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Proceed To Payment</h1>
        <p className="text-slate-400">Fake payment for demo purposes only.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="panel space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{doctorName}</h2>
              <p className="text-slate-400">Consultation Fee</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">₹{fee}</p>
              <p className="flex items-center justify-end gap-2 text-xs text-slate-400">
                <FaLock /> Demo only
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-slate-400">Date</p>
            <p className="font-semibold">{new Date(appointmentDate).toLocaleDateString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-slate-400">Time</p>
            <p className="font-semibold">{appointmentTime}</p>
          </div>
        </aside>

        <form className="panel space-y-6 p-6" onSubmit={onPay}>
          <div>
            <h2 className="text-2xl font-bold">Choose Payment Method</h2>
            <p className="text-slate-400">Select one option to continue.</p>
          </div>

          <div className="space-y-3">
            {['Credit Card', 'Debit Card', 'UPI'].map((method) => (
              <label key={method} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
                <span className="font-semibold">{method}</span>
              </label>
            ))}
          </div>

          {paymentMethod === 'UPI' ? (
            <div className="space-y-4">
              <Input
                id="upiId"
                label="UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="name@bank"
                required
              />
            </div>
          ) : (
            <div className="space-y-4">
              <Input
                id="cardNumber"
                label="Card Number"
                value={cardForm.cardNumber}
                onChange={(e) => setCardForm((c) => ({ ...c, cardNumber: e.target.value }))}
                placeholder="1234 5678 9012 3456"
                required
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  id="expiryDate"
                  label="Expiry Date"
                  value={cardForm.expiryDate}
                  onChange={(e) => setCardForm((c) => ({ ...c, expiryDate: e.target.value }))}
                  placeholder="MM/YY"
                  required
                />
                <Input
                  id="cvv"
                  label="CVV"
                  value={cardForm.cvv}
                  onChange={(e) => setCardForm((c) => ({ ...c, cvv: e.target.value }))}
                  placeholder="123"
                  required
                />
              </div>
              <Input
                id="cardHolderName"
                label="Card Holder Name"
                value={cardForm.cardHolderName}
                onChange={(e) => setCardForm((c) => ({ ...c, cardHolderName: e.target.value }))}
                placeholder="Full name"
                required
              />
            </div>
          )}

          <Button type="submit" disabled={submitting}>
            {submitting ? <Loader label="Processing" /> : `Pay ₹${fee}`}
          </Button>

          <p className="text-xs text-slate-400">
            No real charge will be made. This is a simulated payment flow for demo/portfolio purposes.
          </p>
        </form>
      </div>

      <Modal
        open={successOpen}
        title="Payment Successful"
        onClose={() => {
          setSuccessOpen(false);
        }}
      >
        <div className="space-y-4">
          <div className="text-sm">
            <p className="font-semibold">Transaction ID</p>
            <p className="text-slate-300">{transactionId}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Doctor Name</p>
            <p className="text-slate-300">{doctorName}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Appointment Date</p>
            <p className="text-slate-300">{new Date(appointmentDate).toLocaleDateString()}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Appointment Time</p>
            <p className="text-slate-300">{appointmentTime}</p>
          </div>
          <div className="text-green-400 font-semibold">Appointment Confirmed</div>
        </div>
      </Modal>
    </section>
  );
};

export default PaymentPage;

