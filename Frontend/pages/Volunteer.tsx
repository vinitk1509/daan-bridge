
import React, { useState } from 'react';
import { Card, Badge, Button, Tabs, Modal, Input, Select } from '../components/UI';
import { MOCK_TUTOR_SESSIONS, MOCK_VOLUNTEER_EVENTS } from '../data';
import { Calendar, MapPin, Users, Video, BookOpen, Clock, Star, MessageSquare, CheckCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Volunteer = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Events');
  
  // State for Tutor Flow
  const [isRegisteredTutor, setIsRegisteredTutor] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  
  // Forms
  const [registerForm, setRegisterForm] = useState({
    bio: '',
    subjects: '',
    mode: 'Online',
    address: ''
  });

  const [sessionForm, setSessionForm] = useState({
    subject: '',
    date: '',
    time: '',
    mode: 'Online',
    address: '',
    maxStudents: 5
  });

  // Tutor Profile View State
  const [selectedTutor, setSelectedTutor] = useState<any | null>(null);

  const handleViewTutor = (tutorName: string) => {
    setSelectedTutor({
        name: tutorName,
        avatar: `https://i.pravatar.cc/150?u=${tutorName.replace(' ', '')}`,
        role: 'Certified Tutor',
        rating: 4.9,
        reviews: 24,
        bio: "Passionate educator with over 5 years of experience in helping students achieve their academic goals. I believe in a personalized approach to learning.",
        subjects: ['Mathematics', 'Physics', 'Computer Science'],
        verified: true,
        joined: 'September 2023'
    });
  };

  const handleRegisterSubmit = () => {
      // Validate form logic here
      setIsRegisteredTutor(true);
      setShowRegisterModal(false);
      alert("Congratulations! You are now a registered tutor. You can start creating sessions.");
  };

  const handleCreateSession = () => {
      setShowSessionModal(false);
      alert("Session Created Successfully!");
  };

  const handleMessageTutor = () => {
      navigate('/chat');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Volunteering & Tutoring</h1>
           <p className="text-slate-500 dark:text-slate-400">Give your time and skills to those who need it most.</p>
        </div>
        <Button variant="outline" onClick={() => alert('Downloading Certificate...')}>My Certificates</Button>
      </div>

      <Tabs 
        tabs={['Events', 'Tutoring', 'My Log']} 
        activeTab={activeTab} 
        onChange={setActiveTab} 
      />

      {activeTab === 'Events' && (
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_VOLUNTEER_EVENTS.map(event => (
               <Card key={event.id} className="p-6 flex flex-col justify-between h-full">
                  <div>
                     <div className="flex justify-between items-start mb-4">
                        <Badge variant="info">Event</Badge>
                        <span className="text-xs font-bold text-slate-400">{event.date}</span>
                     </div>
                     <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{event.title}</h3>
                     <p className="text-sm text-slate-500 mb-4">Organized by {event.org}</p>
                     
                     <div className="space-y-2 mb-6">
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                           <MapPin size={16} className="mr-2 text-slate-400" /> {event.location}
                        </div>
                        <div className="flex items-center text-sm text-slate-600 dark:text-slate-300">
                           <Users size={16} className="mr-2 text-slate-400" /> {event.spots - event.filled} spots left
                        </div>
                     </div>
                     
                     <div className="flex flex-wrap gap-2 mb-4">
                        {event.requiredSkills.map(skill => (
                           <span key={skill} className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs text-slate-600 dark:text-slate-300">{skill}</span>
                        ))}
                     </div>
                  </div>
                  <Button className="w-full" onClick={() => alert('Registered for Event!')}>Join Event</Button>
               </Card>
            ))}
         </div>
      )}

      {activeTab === 'Tutoring' && (
         <div className="space-y-6">
            {/* Tutor CTA Banner */}
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
               <div>
                  <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300">
                      {isRegisteredTutor ? 'Manage Your Sessions' : 'Become a Tutor'}
                  </h3>
                  <p className="text-sm text-indigo-700 dark:text-indigo-400 mt-1">
                      {isRegisteredTutor 
                        ? 'Create new learning opportunities or manage existing classes.' 
                        : 'Share your expertise and help students succeed.'}
                  </p>
               </div>
               <Button 
                onClick={() => isRegisteredTutor ? setShowSessionModal(true) : setShowRegisterModal(true)}
                className="flex items-center gap-2"
               >
                  {isRegisteredTutor ? <><Plus size={18}/> Create Session</> : 'Register Now'}
               </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               {MOCK_TUTOR_SESSIONS.map(session => (
                  <Card key={session.id} className="p-5 border-l-4 border-indigo-500 flex flex-col hover:shadow-md transition-shadow">
                     <div className="flex justify-between items-start mb-3">
                        <Badge variant={session.type === 'ONLINE' ? 'success' : 'warning'}>{session.type}</Badge>
                        <span className="flex items-center text-xs font-bold text-slate-400">
                           <Clock size={12} className="mr-1" /> {session.time}
                        </span>
                     </div>
                     <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-1">{session.subject}</h3>
                     
                     {/* Tutor Link */}
                     <div className="mb-4">
                        <span className="text-sm text-slate-500">Tutor: </span>
                        <button 
                            onClick={() => handleViewTutor(session.tutorName)}
                            className="text-sm font-semibold text-primary-600 hover:underline focus:outline-none"
                        >
                            {session.tutorName}
                        </button>
                     </div>
                     
                     <div className="flex items-center justify-between text-sm mb-4 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg mt-auto">
                        <span className="flex items-center gap-1 text-slate-600 dark:text-slate-300"><Users size={14}/> {session.students}/{session.maxStudents} Students</span>
                        <span className="font-mono text-slate-500">{session.date}</span>
                     </div>

                     <Button 
                        variant="outline" 
                        className="w-full" 
                        disabled={session.status === 'BOOKED'}
                        onClick={() => alert('Session Joined!')}
                     >
                        {session.status === 'BOOKED' ? 'Full' : 'Join Session'}
                     </Button>
                  </Card>
               ))}
            </div>
         </div>
      )}

      {activeTab === 'My Log' && (
         <Card className="p-6">
            <h3 className="font-bold mb-4">Volunteer History</h3>
            <table className="w-full text-left">
               <thead>
                  <tr className="text-xs text-slate-500 border-b border-slate-200 dark:border-slate-700">
                     <th className="pb-3">Activity</th>
                     <th className="pb-3">Date</th>
                     <th className="pb-3">Hours</th>
                     <th className="pb-3">Status</th>
                  </tr>
               </thead>
               <tbody className="text-sm">
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                     <td className="py-3">Food Drive Logistics</td>
                     <td className="py-3">May 12, 2024</td>
                     <td className="py-3">4 hrs</td>
                     <td className="py-3"><Badge variant="success">Verified</Badge></td>
                  </tr>
                  <tr>
                     <td className="py-3">Math Tutoring</td>
                     <td className="py-3">May 15, 2024</td>
                     <td className="py-3">1 hr</td>
                     <td className="py-3"><Badge variant="warning">Pending</Badge></td>
                  </tr>
               </tbody>
            </table>
            <Button variant="ghost" className="mt-4 w-full text-sm text-slate-500">Log New Hours manually</Button>
         </Card>
      )}

      {/* Register as Tutor Modal */}
      <Modal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} title="Tutor Registration">
         <div className="space-y-4">
            <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg text-sm text-slate-600 dark:text-slate-300">
               Join our network of educators. Please provide details about your expertise and teaching preferences.
            </div>
            
            <div>
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Bio & Experience</label>
               <textarea 
                  className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 outline-none h-24 resize-none"
                  placeholder="Briefly describe your teaching experience and methodology..."
                  value={registerForm.bio}
                  onChange={e => setRegisterForm({...registerForm, bio: e.target.value})}
               />
            </div>

            <Input 
               label="Subjects (Comma separated)" 
               placeholder="e.g. Math, Physics, English" 
               value={registerForm.subjects}
               onChange={e => setRegisterForm({...registerForm, subjects: e.target.value})}
            />

            <Select 
               label="Preferred Mode" 
               value={registerForm.mode} 
               onChange={e => setRegisterForm({...registerForm, mode: e.target.value})}
            >
               <option>Online</option>
               <option>Offline</option>
               <option>Hybrid (Both)</option>
            </Select>

            {/* Conditional Address Field for Registration */}
            {(registerForm.mode === 'Offline' || registerForm.mode === 'Hybrid (Both)') && (
               <div className="animate-fade-in">
                  <Input 
                     label="Base Location / Studio Address" 
                     placeholder="Where will offline sessions primarily be held?" 
                     value={registerForm.address}
                     onChange={e => setRegisterForm({...registerForm, address: e.target.value})}
                  />
               </div>
            )}

            <Button className="w-full mt-2" onClick={handleRegisterSubmit}>Submit Profile</Button>
         </div>
      </Modal>

      {/* Create Session Modal (Only for Registered Tutors) */}
      <Modal isOpen={showSessionModal} onClose={() => setShowSessionModal(false)} title="Create New Session">
         <div className="space-y-4">
            <Input 
               label="Subject / Topic" 
               placeholder="e.g. Advanced Calculus" 
               value={sessionForm.subject}
               onChange={e => setSessionForm({...sessionForm, subject: e.target.value})}
            />
            
            <div className="grid grid-cols-2 gap-4">
               <Input 
                  type="date" 
                  label="Date" 
                  value={sessionForm.date}
                  onChange={e => setSessionForm({...sessionForm, date: e.target.value})}
               />
               <Input 
                  type="time" 
                  label="Time" 
                  value={sessionForm.time}
                  onChange={e => setSessionForm({...sessionForm, time: e.target.value})}
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Select 
                   label="Session Mode" 
                   value={sessionForm.mode}
                   onChange={e => setSessionForm({...sessionForm, mode: e.target.value})}
                >
                   <option>Online</option>
                   <option>Offline</option>
                </Select>
                <Input 
                  type="number" 
                  label="Max Students" 
                  value={sessionForm.maxStudents}
                  onChange={e => setSessionForm({...sessionForm, maxStudents: parseInt(e.target.value)})}
               />
            </div>

            {/* Conditional Address Field for Session */}
            {sessionForm.mode === 'Offline' && (
               <div className="animate-fade-in">
                  <Input 
                     label="Session Venue Address" 
                     placeholder="Full address of the classroom/location" 
                     value={sessionForm.address}
                     onChange={e => setSessionForm({...sessionForm, address: e.target.value})}
                  />
               </div>
            )}
            
            {sessionForm.mode === 'Online' && (
               <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-xs flex items-center gap-2">
                  <Video size={16} />
                  A Google Meet/Zoom link will be generated automatically upon creation.
               </div>
            )}

            <Button className="w-full" onClick={handleCreateSession}>Publish Session</Button>
         </div>
      </Modal>

      {/* Tutor Profile Modal */}
      <Modal isOpen={!!selectedTutor} onClose={() => setSelectedTutor(null)} title="Tutor Profile">
         {selectedTutor && (
            <div className="text-center space-y-6">
                <div className="flex flex-col items-center">
                    <img 
                        src={selectedTutor.avatar} 
                        alt={selectedTutor.name} 
                        className="w-24 h-24 rounded-full border-4 border-primary-100 dark:border-primary-900 mb-3" 
                    />
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        {selectedTutor.name}
                        {selectedTutor.verified && <CheckCircle size={18} className="text-blue-500" />}
                    </h3>
                    <p className="text-primary-600 font-medium text-sm">{selectedTutor.role}</p>
                    
                    <div className="flex items-center gap-1 mt-2">
                        <Star size={16} className="text-amber-400 fill-amber-400" />
                        <span className="font-bold text-slate-800 dark:text-white">{selectedTutor.rating}</span>
                        <span className="text-slate-400 text-sm">({selectedTutor.reviews} Reviews)</span>
                    </div>
                </div>

                <div className="text-left bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                    <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{selectedTutor.bio}"</p>
                </div>

                <div className="text-left">
                    <h4 className="text-xs font-bold uppercase text-slate-400 mb-2">Expertise</h4>
                    <div className="flex flex-wrap gap-2">
                        {selectedTutor.subjects.map((sub: string) => (
                            <Badge key={sub} variant="info">{sub}</Badge>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700">
                    <Button className="w-full flex items-center justify-center gap-2" onClick={handleMessageTutor}>
                        <MessageSquare size={18} /> Message Tutor
                    </Button>
                </div>
            </div>
         )}
      </Modal>
    </div>
  );
};
