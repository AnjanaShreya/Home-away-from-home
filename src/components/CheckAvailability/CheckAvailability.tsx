import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  DatePicker,
  InputNumber,
  Button,
  Modal,
  Form,
  Input,
  SelectPicker,
  Message,
  toaster,
} from 'rsuite';
import type {
  RoomOption,
  SelectedRoom,
  CustomQuoteFormData,
} from '../../types';
import siteData from '../../data/booksitedata.json';
import styles from './CheckAvailability.module.scss';

export const CheckAvailability: React.FC = () => {

  // Search input state (unapplied until Check Availability is clicked)
  const defaultCheckIn = new Date();
  const defaultCheckOut = new Date(Date.now() + 86400000 * 1); // 1 night / 1 day default

  const [checkInInput, setCheckInInput] = useState<Date | null>(defaultCheckIn);
  const [checkOutInput, setCheckOutInput] = useState<Date | null>(defaultCheckOut);
  const [guestsInput, setGuestsInput] = useState<number>(1);

  // Applied search filter state
  const [checkIn, setCheckIn] = useState<Date | null>(defaultCheckIn);
  const [checkOut, setCheckOut] = useState<Date | null>(defaultCheckOut);
  const [guests, setGuests] = useState<number>(1);

  // Selection state
  const [selectedRoom, setSelectedRoom] = useState<SelectedRoom>(null);

  // Custom Quote Modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [quoteForm, setQuoteForm] = useState<CustomQuoteFormData>({
    checkIn: null,
    checkOut: null,
    name: '',
    email: '',
    phone: '',
    people: 2,
    reason: '',
  });

  // Calculate calculated nights based on applied search dates
  const calculateNights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const diffTime = checkOut.getTime() - checkIn.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }, [checkIn, checkOut]);

  // Helper to normalize any date to midnight timestamp
  const getMidnight = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  };

  // Disable dates strictly before today for Check-in (allows selecting today's date)
  const shouldDisableCheckIn = (date?: Date) => {
    if (!date) return false;
    const now = new Date();
    return getMidnight(date) < getMidnight(now);
  };

  // Disable dates before or on Check-in date for Check-out
  const shouldDisableCheckOut = (date?: Date) => {
    if (!date) return false;
    const now = new Date();
    const minTimestamp = checkInInput ? getMidnight(checkInInput) : getMidnight(now);
    return getMidnight(date) <= minTimestamp;
  };

  // Handle Check-in change with auto check-out adjustment
  const handleCheckInChange = (val: Date | null) => {
    setCheckInInput(val);
    if (val && checkOutInput && getMidnight(checkOutInput) <= getMidnight(val)) {
      setCheckOutInput(new Date(val.getTime() + 86400000));
    }
  };

  // Modal Date constraints
  const shouldDisableModalCheckIn = (date?: Date) => {
    if (!date) return false;
    const now = new Date();
    return getMidnight(date) < getMidnight(now);
  };

  const shouldDisableModalCheckOut = (date?: Date) => {
    if (!date) return false;
    const now = new Date();
    const minTimestamp = quoteForm.checkIn ? getMidnight(quoteForm.checkIn) : getMidnight(now);
    return getMidnight(date) <= minTimestamp;
  };

  const handleModalCheckInChange = (val: Date | null) => {
    const updated = { ...quoteForm, checkIn: val };
    if (val && quoteForm.checkOut && getMidnight(quoteForm.checkOut) <= getMidnight(val)) {
      updated.checkOut = new Date(val.getTime() + 86400000);
    }
    setQuoteForm(updated);
  };


  // Format date helper (e.g. "19 Sept 2026")
  const formatDateStr = (d: Date | null) => {
    if (!d) return '';
    return d.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Handle Search Submission on clicking "Check Availability"
  const handleCheckAvailability = () => {
    setCheckIn(checkInInput);
    setCheckOut(checkOutInput);
    setGuests(guestsInput);
    setSelectedRoom(null);

    toaster.push(
      <Message type="info" closable>
        Availability updated for selected dates.
      </Message>,
      { placement: 'topCenter' }
    );
  };

  // Open Quote Modal with pre-populated values
  const handleOpenQuoteModal = (reasonOverride?: string) => {
    setQuoteForm((prev) => ({
      ...prev,
      checkIn: checkIn,
      checkOut: checkOut,
      people: guests,
      reason:
        reasonOverride ||
        (calculateNights >= 30
          ? 'Monthly Stay'
          : calculateNights >= 7
          ? 'Weekly Stay'
          : guests > 5
          ? 'Corporate Group Booking'
          : prev.reason || 'Weekly Stay'),
    }));
    setQuoteModalOpen(true);
  };

  // Handle Room Selection
  const handleSelectRoom = (room: RoomOption) => {
    const nights = calculateNights > 0 ? calculateNights : 1;
    setSelectedRoom({
      room,
      nights,
      totalPrice: room.rate * nights,
    });
  };

  // Submit Custom Quote Modal
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteForm.name || !quoteForm.phone || !quoteForm.email) {
      toaster.push(
        <Message type="error" closable>
          Please fill in all required fields in the quote form.
        </Message>,
        { placement: 'topCenter' }
      );
      return;
    }

    toaster.push(
      <Message type="success" closable>
        Thank you {quoteForm.name}! Your custom quote request has been submitted. Our team will email you a tailored tariff shortly!
      </Message>,
      { placement: 'topCenter' }
    );

    setQuoteModalOpen(false);
    setQuoteForm({
      checkIn: null,
      checkOut: null,
      name: '',
      email: '',
      phone: '',
      people: 2,
      reason: '',
    });
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Topbar */}
      <header className={styles.topbar}>
        <div className={`container ${styles.nav}`}>
          <Link to="/" className={styles.brand}>
            <span className={styles.brandMark}>
              <svg fill="none" stroke="white" strokeWidth="1.8" viewBox="0 0 24 24">
                <path d="M3 11.3 12 4l9 7.3"></path>
                <path d="M5.5 10.5V20h13v-9.5"></path>
                <path d="M9 20v-5.5h6V20"></path>
              </svg>
            </span>
            Home Away From Home
          </Link>
          <div className={styles.navRight}>
            <span className={styles.helpText}>Need help choosing? Talk to us</span>
            <Link to="/" className={styles.backLink}>
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.kicker}>Book your stay · Hyderabad</div>
          <h1>
            Check availability.<br />Choose your room.
          </h1>
          <p>
            Select your dates to see available accommodation options for single and double occupancy, with AC and Non-AC choices.
          </p>
        </div>
      </section>

      {/* Floating Search Bar */}
      <section className={styles.searchWrap}>
        <div className="container">
          <div className={styles.searchCard}>
            <div className={styles.searchGrid}>
              <div className={styles.fieldGroup}>
                <label>Check-in</label>
                <DatePicker
                  oneTap
                  shouldDisableDate={shouldDisableCheckIn}
                  container={() => document.body}
                  value={checkInInput}
                  onChange={handleCheckInChange}
                  format="dd-MM-yyyy"
                  block
                  cleanable={false}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>Check-out</label>
                <DatePicker
                  oneTap
                  shouldDisableDate={shouldDisableCheckOut}
                  container={() => document.body}
                  value={checkOutInput}
                  onChange={(val) => setCheckOutInput(val)}
                  format="dd-MM-yyyy"
                  block
                  cleanable={false}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label>No. of Guests</label>
                <InputNumber
                  value={guestsInput}
                  onChange={(val) => setGuestsInput(Number(val) || 1)}
                  min={1}
                  max={50}
                />
              </div>
              <Button
                className={styles.searchBtn}
                appearance="primary"
                onClick={handleCheckAvailability}
              >
                Check Availability
              </Button>
            </div>
            <div className={styles.searchMeta}>
              <span>Fully furnished</span>
              <span>Housekeeping support</span>
              <span>Kitchen access</span>
              <span>Flexible stays</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className={styles.mainContainer}>
        <div className="container">
          <div className={styles.resultHead}>
            <div>
              <div className={styles.kicker}>AVAILABLE STAYS</div>
              <h2>Accommodation options</h2>
              <p>
                {formatDateStr(checkIn)} &rarr; {formatDateStr(checkOut)} &middot; {guests} {guests === 1 ? 'guest' : 'guests'}
              </p>
            </div>
            <div className={styles.nightPill}>
              {calculateNights} {calculateNights === 1 ? 'night' : 'nights'}
            </div>
          </div>

          <div className={styles.resultsLayout}>
            {/* Room List */}
            <section className={styles.roomList}>
              {/* Extended Stay / Weekly & Monthly Custom Quote Notice Banner */}
              {(calculateNights >= 7 || guests > 5) && (
                <article className={`${styles.customQuoteCard} ${styles.cqTopBanner}`}>
                  <div>
                    <div className={styles.cqKicker}>
                      {guests > 5 ? '6+ Guests Group Stay' : 'Extended / Weekly / Monthly Stay'}
                    </div>
                    <h3>
                      {guests > 5
                        ? 'Group stay? Get a custom quote'
                        : `Staying ${calculateNights || 7} nights or longer?`}
                    </h3>
                    <p>
                      {guests > 5
                        ? `For ${guests} guests, we recommend a tailored group quotation instead of standard room-by-room booking.`
                        : `Your stay qualifies for special weekly or monthly stay pricing with customized tariffs.`}
                    </p>
                    <div className={styles.cqTags}>
                      <span className={styles.cqTag}>Weekly Discounts</span>
                      <span className={styles.cqTag}>Monthly Discounts</span>
                      <span className={styles.cqTag}>Customized Tariffs</span>
                    </div>
                  </div>
                  <div>
                    <Button
                      className={styles.cqButton}
                      onClick={() => handleOpenQuoteModal()}
                    >
                      Get a Custom Quote →
                    </Button>
                  </div>
                </article>
              )}

              {(siteData.availabilityOptions as RoomOption[]).map((room) => {
                const roomCapacity = room.occupancy.toLowerCase().includes('double') || room.occupancy.toLowerCase().includes('2bhk') || room.occupancy.toLowerCase().includes('studio') ? 2 : 1;
                const roomsNeeded = Math.ceil(guests / roomCapacity);
                const roomNights = calculateNights > 0 ? calculateNights : 1;
                const totalPriceCalc = room.rate * roomsNeeded * roomNights;

                return (
                  <article key={room.id} className={styles.roomCard}>
                    <div className={styles.roomImage}>
                      <img src={room.image} alt={room.name} />
                      <span className={styles.roomBadge}>{room.badge}</span>
                    </div>

                    <div className={styles.roomBody}>
                      <div className={styles.roomInfo}>
                        <h3>{room.name}</h3>
                        <div className={styles.roomSub}>{room.occupancy}</div>
                        <div className={styles.chips}>
                          <span
                            className={`${styles.chip} ${
                              room.acType === 'Air-conditioned' ? styles.ac : ''
                            }`}
                          >
                            {room.acType}
                          </span>
                          <span className={styles.chip}>Furnished</span>
                          <span className={styles.chip}>Housekeeping</span>
                        </div>
                        <div className={styles.features}>
                          {room.features.map((feat, idx) => (
                            <span key={idx} className={styles.feature}>
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.rateCol}>
                        <small>ROOM TARIFF</small>
                        <div className={styles.price}>
                          ₹{room.rate.toLocaleString('en-IN')} <span>/room/night</span>
                        </div>
                        {roomsNeeded > 1 && (
                          <div style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 10px', textAlign: 'right' }}>
                            ₹{totalPriceCalc.toLocaleString('en-IN')} for {roomsNeeded} rooms × {roomNights} night
                          </div>
                        )}
                        <Button
                          className={styles.selectBtn}
                          onClick={() => handleSelectRoom(room)}
                        >
                          {roomsNeeded > 1 ? `Select ${roomsNeeded} Rooms` : 'Select Room'}
                        </Button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Sidebar Summary */}
            <aside className={styles.summaryCard}>
              <h3>Your booking</h3>
              {!selectedRoom ? (
                <div className={styles.sumEmpty}>
                  Choose a room after selecting your dates. Your booking summary will appear here.
                </div>
              ) : (
                <div>
                  <div className={styles.sumRow}>
                    <span>Room</span>
                    <strong>{selectedRoom.room.name}</strong>
                  </div>
                  <div className={styles.sumRow}>
                    <span>Guests</span>
                    <strong>{guests} Guest(s)</strong>
                  </div>
                  <div className={styles.sumRow}>
                    <span>Duration</span>
                    <strong>{selectedRoom.nights} Night(s)</strong>
                  </div>
                  <div className={styles.sumRow}>
                    <span>Rate / Night</span>
                    <strong>₹{selectedRoom.room.rate.toLocaleString('en-IN')}</strong>
                  </div>
                  <div className={styles.sumTotal}>
                    <span>Total Amount</span>
                    <span>₹{selectedRoom.totalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}

              <Button
                className={styles.checkoutBtn}
                disabled={!selectedRoom}
                onClick={() => handleOpenQuoteModal()}
              >
                Continue to Guest Details →
              </Button>

              {/* Custom Quote Option in Summary */}
              <div className={styles.summaryQuote}>
                <p>
                  {calculateNights >= 7
                    ? 'Qualifies for a custom quote option for weekly/monthly stay rates.'
                    : guests > 5
                    ? 'For groups of more than 5 guests, request a tailored quote.'
                    : 'Need a weekly/monthly stay or custom quote?'}
                </p>
                <button type="button" onClick={() => handleOpenQuoteModal()}>
                  Get a Custom Quote
                </button>
              </div>

              <div className={styles.secureNote}>
                No payment is collected on this prototype page.
              </div>
            </aside>
          </div>

        </div>
      </main>

      {/* Custom Quote RSuite Modal */}
      <Modal
        open={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        size="md"
      >
        <Modal.Header>
          <Modal.Title className={styles.modalTitle}>
            Get a Custom Quote
          </Modal.Title>
          <p className={styles.modalSub}>
            For larger groups and longer stays, share your requirement and we’ll work out a suitable stay plan and tariff.
          </p>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <form id="quoteForm" onSubmit={handleQuoteSubmit}>
            <div className={styles.modalFormGrid}>
              <div>
                <Form.ControlLabel className={styles.modalLabel}>
                  Check-in Date
                </Form.ControlLabel>
                <DatePicker
                  oneTap
                  shouldDisableDate={shouldDisableModalCheckIn}
                  value={quoteForm.checkIn}
                  onChange={handleModalCheckInChange}
                  block
                  placeholder="Select check-in"
                />
              </div>
              <div>
                <Form.ControlLabel className={styles.modalLabel}>
                  Check-out Date
                </Form.ControlLabel>
                <DatePicker
                  oneTap
                  shouldDisableDate={shouldDisableModalCheckOut}
                  value={quoteForm.checkOut}
                  onChange={(val) => setQuoteForm({ ...quoteForm, checkOut: val })}
                  block
                  placeholder="Select check-out"
                />
              </div>
              <div>
                <Form.ControlLabel className={styles.modalLabel}>
                  Full Name *
                </Form.ControlLabel>
                <Input
                  value={quoteForm.name}
                  onChange={(val) => setQuoteForm({ ...quoteForm, name: val })}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <Form.ControlLabel className={styles.modalLabel}>
                  Email ID *
                </Form.ControlLabel>
                <Input
                  type="email"
                  value={quoteForm.email}
                  onChange={(val) => setQuoteForm({ ...quoteForm, email: val })}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <Form.ControlLabel className={styles.modalLabel}>
                  Phone Number *
                </Form.ControlLabel>
                <Input
                  value={quoteForm.phone}
                  onChange={(val) => setQuoteForm({ ...quoteForm, phone: val })}
                  placeholder="+91 Mobile number"
                  required
                />
              </div>
              <div>
                <Form.ControlLabel className={styles.modalLabel}>
                  No. of People
                </Form.ControlLabel>
                <InputNumber
                  value={quoteForm.people}
                  onChange={(val) => setQuoteForm({ ...quoteForm, people: Number(val) || 1 })}
                  min={1}
                  max={100}
                />
              </div>
              <div className={styles.modalFullWidth}>
                <Form.ControlLabel className={styles.modalLabel}>
                  Reason of Stay *
                </Form.ControlLabel>
                <SelectPicker
                  data={siteData.contactInfo.customQuoteReasons.map((item) => ({
                    label: item,
                    value: item,
                  }))}
                  value={quoteForm.reason}
                  onChange={(val) => setQuoteForm({ ...quoteForm, reason: val || '' })}
                  block
                  placement="topStart"
                  menuMaxHeight={200}
                  preventOverflow
                  container={() => document.body}
                  placeholder="Select reason for stay"
                />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className={styles.modalFooter}>
          <Button onClick={() => setQuoteModalOpen(false)} appearance="subtle" className={styles.modalCancelBtn}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="quoteForm"
            appearance="primary"
            className={styles.modalSubmitBtn}
          >
            Request Custom Quote →
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerInner}`}>
          <div>
            <strong>Home Away From Home</strong> · Serviced Apartments in Hyderabad
          </div>
          <div>Extended Stays · Business Stays · Medical-Related Stays</div>
        </div>
      </footer>
    </div>
  );
};

export default CheckAvailability;
