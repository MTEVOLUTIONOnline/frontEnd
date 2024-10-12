import { useState } from 'react';

const ExamCROLOGRAMA = () => {
  const [schedule, setSchedule] = useState([
    { id: 1, subject: 'Matemática', date: '2024-10-15', time: '14:00' },
    { id: 2, subject: 'História', date: '2024-10-16', time: '10:00' },
    { id: 3, subject: 'Física', date: '2024-10-17', time: '16:00' },
  ]);

  const [materials, setMaterials] = useState([
    { id: 1, subject: 'Matemática', title: 'Álgebra Linear', completed: false },
    { id: 2, subject: 'História', title: 'Revolução Industrial', completed: false },
    { id: 3, subject: 'Física', title: 'Leis de Newton', completed: false },
  ]);

  const [newSubject, setNewSubject] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  const addScheduleItem = () => {
    if (newSubject && newDate && newTime) {
      setSchedule([...schedule, {
        id: schedule.length + 1,
        subject: newSubject,
        date: newDate,
        time: newTime
      }]);
      setNewSubject('');
      setNewDate('');
      setNewTime('');
    }
  };

  const toggleMaterialCompletion = (id: any) => {
    setMaterials(materials.map(material => 
      material.id === id ? { ...material, completed: !material.completed } : material
    ));
  };

  return (
    <div className="exam-preparation bg-gray-100 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      
      <div className="schedule mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Cronograma de Estudos</h3>
        <ul className="bg-white rounded-lg shadow overflow-hidden">
          {schedule.map(item => (
            <li key={item.id} className="border-b last:border-b-0 p-4 hover:bg-gray-50">
              <span className="font-medium text-gray-800">{item.subject}</span>
              <span className="text-gray-600 ml-4">{item.date} às {item.time}</span>
            </li>
          ))}
        </ul>
        <div className="add-schedule-item mt-4 flex flex-wrap gap-2">
          <input 
            type="text" 
            placeholder="Disciplina" 
            value={newSubject} 
            onChange={(e) => setNewSubject(e.target.value)} 
            className="flex-grow p-2 border rounded"
          />
          <input 
            type="date" 
            value={newDate} 
            onChange={(e) => setNewDate(e.target.value)} 
            className="flex-grow p-2 border rounded"
          />
          <input 
            type="time" 
            value={newTime} 
            onChange={(e) => setNewTime(e.target.value)} 
            className="flex-grow p-2 border rounded"
          />
          <button 
            onClick={addScheduleItem}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
          >
            Adicionar
          </button>
        </div>
      </div>

      <div className="study-materials">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Materiais de Estudo</h3>
        <ul className="bg-white rounded-lg shadow overflow-hidden">
          {materials.map(material => (
            <li key={material.id} className="border-b last:border-b-0 p-4 flex items-center hover:bg-gray-50">
              <input 
                type="checkbox" 
                checked={material.completed} 
                onChange={() => toggleMaterialCompletion(material.id)} 
                className="mr-4 h-5 w-5 text-blue-600"
              />
              <span className={`flex-grow ${material.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                <span className="font-medium">{material.subject}</span> - {material.title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExamCROLOGRAMA;