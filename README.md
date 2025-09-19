
# � Mobile Device Usage and User Behavior Analysis

A comprehensive full-stack application that analyzes mobile device usage patterns and predicts user behavior classifications using machine learning. The project combines data science, machine learning, and modern web development to provide insights into how users interact with their mobile devices.

## 🌐 Live Demo
Experience the interactive dashboard: [https://v0-new-project-b2syxlojptz.vercel.app/](https://v0-new-project-b2syxlojptz.vercel.app/)

## 🎯 Project Overview

This project analyzes a dataset of 700+ mobile device users to understand usage patterns and classify user behavior. It features:

- **Data Analysis & Visualization**: Comprehensive exploratory data analysis with interactive charts
- **Machine Learning Model**: Trained model for predicting user behavior classes (1-5 scale)
- **Interactive Dashboard**: Modern React/Next.js frontend with real-time data visualization
- **API Backend**: Flask-based REST API for model predictions
- **Responsive Design**: Mobile-first design with dark/light theme support

## 🔍 Key Features

### Data Analysis
- **Comprehensive EDA**: Statistical analysis of user behavior patterns
- **Data Preprocessing**: Handling missing values, outliers, and data cleaning
- **Feature Engineering**: Creation of meaningful metrics for behavior prediction
- **Visual Analytics**: Interactive charts showing device preferences, OS distribution, and usage patterns

### Machine Learning
- **Behavior Classification**: Predicts user behavior class (1-5) based on usage metrics
- **Model Training**: Trained on multiple features including app usage time, screen time, battery drain
- **API Integration**: RESTful API for real-time predictions

### Frontend Dashboard
- **Interactive Visualizations**: Charts for behavior distribution, device models, and usage trends
- **Data Table**: Sortable and filterable user data display
- **Prediction Interface**: Real-time behavior prediction form
- **Responsive Design**: Optimized for desktop and mobile devices
- **Theme Support**: Dark and light mode toggle

## 🧰 Tech Stack

### Backend
- **Python 3.x**: Core programming language
- **Flask**: Web framework for API development
- **Pandas**: Data manipulation and analysis
- **Scikit-learn**: Machine learning model training
- **Matplotlib/Seaborn**: Data visualization
- **Pickle**: Model serialization

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern UI component library
- **Recharts**: Data visualization library
- **React Hook Form**: Form handling with validation

### Tools & Deployment
- **Vercel**: Frontend deployment
- **Git**: Version control
- **VS Code**: Development environment

## 📊 Dataset Overview

The dataset contains **700+ user records** with the following features:

| Feature | Description | Type |
|---------|-------------|------|
| User ID | Unique identifier | Integer |
| Device Model | Phone model (iPhone, Samsung, etc.) | Categorical |
| Operating System | iOS or Android | Categorical |
| App Usage Time (min/day) | Daily app usage in minutes | Numeric |
| Screen On Time (hours/day) | Daily screen time in hours | Numeric |
| Battery Drain (mAh/day) | Daily battery consumption | Numeric |
| Number of Apps Installed | Total installed apps | Numeric |
| Data Usage (MB/day) | Daily data consumption | Numeric |
| Age | User age | Numeric |
| Gender | Male/Female | Categorical |
| User Behavior Class | Target variable (1-5) | Numeric |

### Behavior Classes
- **Class 1**: Light users with minimal device interaction
- **Class 2**: Occasional users with moderate usage
- **Class 3**: Regular users with consistent daily usage
- **Class 4**: Heavy users with high engagement
- **Class 5**: Power users with maximum device utilization

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- Node.js 18 or higher
- Git

### Backend Setup

1. **Clone the repository**
```bash
git clone https://github.com/DeepakAstaya01/Mobile-Device-Usage-and-User-Behavior.git
cd Mobile-Device-Usage-and-User-Behavior
```

2. **Set up Python environment**
```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

3. **Install Python dependencies**
```bash
pip install flask pandas scikit-learn matplotlib seaborn numpy flask-cors
```

4. **Run the Jupyter notebook** (optional - for data analysis)
```bash
jupyter notebook main.ipynb
```

5. **Start the Flask API**
```bash
python main.py
```
The API will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd Frontend
```

2. **Install dependencies**
```bash
npm install
# or
pnpm install
```

3. **Run the development server**
```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:3000`

### API Endpoints

#### GET `/`
Returns API status and available endpoints.

#### POST `/predict`
Predicts user behavior class based on input features.

**Request Body:**
```json
{
  "features": [393, 6.4, 1872, 67, 1122, 40]
}
```

**Response:**
```json
{
  "prediction": [4]
}
```

## 📈 Data Analysis Insights

### Key Findings
- **Device Preferences**: Android devices dominate the dataset (60% vs 40% iOS)
- **Age Demographics**: Users range from 18-59 years with average age of 40
- **Usage Patterns**: Heavy users (Class 4-5) show 3x higher app usage than light users
- **Battery Correlation**: Strong correlation between app usage time and battery drain
- **Gender Distribution**: Relatively balanced between male and female users

### Visualizations
The notebook generates comprehensive visualizations including:
- Distribution plots for all numerical features
- Correlation heatmaps
- Behavior class distribution
- Device model and OS preference charts
- Age and gender distribution analysis

## 🛠️ Project Structure

```
Mobile-Device-Usage-and-User-Behavior/
├── backend/
│   ├── main.py                 # Flask API server
│   ├── main.ipynb             # Data analysis notebook
│   ├── user_behavior_model.pkl # Trained ML model
│   └── Dataset/
│       └── user_behavior_dataset.csv
├── Frontend/
│   ├── app/                   # Next.js app directory
│   ├── components/            # React components
│   ├── lib/                   # Utility functions
│   ├── types/                 # TypeScript definitions
│   └── public/                # Static assets
├── README.md
└── package.json
```

## 🔮 Future Enhancements

- [ ] **Real-time Data Integration**: Connect to live mobile usage APIs
- [ ] **Advanced ML Models**: Implement deep learning for better predictions
- [ ] **User Authentication**: Add user accounts and personalized dashboards
- [ ] **Mobile App**: Develop native mobile application
- [ ] **A/B Testing**: Implement feature flags for dashboard variations
- [ ] **Data Export**: Add CSV/PDF export functionality
- [ ] **Advanced Analytics**: Time-series analysis and trend prediction

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use TypeScript for all new React components
- Add unit tests for new features
- Update documentation for API changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Deepak Astaya**
- GitHub: [@DeepakAstaya01](https://github.com/DeepakAstaya01)
- Email: [Your Email]

## 🙏 Acknowledgments

- Dataset source: [Mobile Device Usage and User Behavior Dataset]
- UI Components: [Shadcn/ui](https://ui.shadcn.com/)
- Deployment: [Vercel](https://vercel.com/)
- Icons: [Lucide React](https://lucide.dev/)

---

⭐ **If you found this project helpful, please give it a star!** ⭐
