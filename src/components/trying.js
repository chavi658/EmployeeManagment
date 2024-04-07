import axios from 'axios';

// נתוני העדכון שנשלחים בבקשת PUT
const updatedData = {
  id: 123,
  name: 'John Doe',
  email: 'john.doe@example.com'
};

// שליחת בקשת PUT עם נתוני העדכון
axios.put('https://api.example.com/users/123', updatedData)
  .then(response => {
    console.log('הנתונים עודכנו בהצלחה:', response.data);
  })
  .catch(error => {
    console.error('שגיאה בעדכון הנתונים:', error);
  });
