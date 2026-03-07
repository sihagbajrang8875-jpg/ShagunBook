# ShagunBook Frontend

A clean, responsive web application to track money given in marriage and family events.

## Features

✅ **Add Records** - Record name, amount, event type, and date  
✅ **View Records** - Display all records in a beautiful table  
✅ **Edit Records** - Modify existing records  
✅ **Delete Records** - Remove records with confirmation  
✅ **Search** - Filter records by name in real-time  
✅ **Total Tracking** - See total amount and record count  
✅ **Local Storage** - Records persist across sessions  
✅ **Responsive Design** - Works on all devices  

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **localStorage** - Client-side data persistence

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Build

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── AddRecord.jsx       # Form to add/edit records
│   │   ├── RecordsTable.jsx    # Display records in table
│   │   ├── SearchBar.jsx       # Search functionality
│   │   └── TotalAmount.jsx     # Display totals
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind CSS imports
├── index.html                  # HTML template
├── package.json                # Dependencies
├── vite.config.js              # Vite config
├── tailwind.config.js          # Tailwind config
└── postcss.config.js           # PostCSS config
```

## Usage

1. **Add a Record**: Fill the form on the left with name, amount, event type, and date, then click "Add Record"
2. **Search**: Type in the search bar to filter records by name
3. **Edit**: Click the "Edit" button on any record to modify it
4. **Delete**: Click "Delete" to remove a record
5. **View Totals**: See the total amount and number of records displayed at the top

## Features Implemented

- ✅ Local storage for persistent data
- ✅ Real-time search filtering
- ✅ Edit and delete functionality
- ✅ Event type dropdown (Wedding, Engagement, Birthday, Anniversary, Baby Shower, Housewarming, Other)
- ✅ Date picker for event dates
- ✅ Beautiful gradient UI with Tailwind CSS
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Form validation
- ✅ Confirmation dialogs for deletion

## Future Enhancements

- Backend API integration
- User authentication
- Multi-user support
- Export to CSV/PDF
- Category-wise analytics
- Email reminders
- Photo upload for events
