import sequelize from './sequelize';
import Project from './models/Project';

const projects = [
    {
        title: 'Market-Entry-Strategy-for-EV-Charging-Startup',
        description: 'A comprehensive strategy analysis for entering the EV charging market, focusing on infrastructure scaling and user adoption.',
        techStack: ['Business Analysis', 'Market Research', 'Financial Modeling'],
        github: 'https://github.com/yourusername/ev-charging-strategy',
        image: 'https://via.placeholder.com/600x400'
    },
    {
        title: 'JID1.0',
        description: 'Joint Innovation Development platform version 1.0. A collaborative tool for tracking innovation metrics.',
        techStack: ['React', 'Node.js', 'PostgreSQL'],
        github: 'https://github.com/yourusername/JID1.0'
    },
    {
        title: 'Student_Data_Management_Portal',
        description: 'A web portal for managing student records, grades, and attendance with role-based access control.',
        techStack: ['PHP', 'MySQL', 'Bootstrap'],
        github: 'https://github.com/yourusername/student-portal'
    },
    {
        title: 'Financial-Data-Visualization-Tool',
        description: 'Interactive dashboard for visualizing complex financial datasets using Jupyter Notebooks and Python.',
        techStack: ['Python', 'Pandas', 'Matplotlib', 'Jupyter'],
        github: 'https://github.com/yourusername/financial-viz'
    },
    {
        title: 'UDA-Sanskrit',
        description: 'Unsupervised Domain Adaptation for Sanskrit text analysis. Forked research project.',
        techStack: ['Python', 'NLP', 'PyTorch'],
        github: 'https://github.com/yourusername/UDA-Sanskrit'
    },
    {
        title: 'EE655',
        description: 'Coursework and projects related to EE655, focusing on advanced electrical engineering concepts.',
        techStack: ['MATLAB', 'Simulink'],
        github: 'https://github.com/yourusername/EE655'
    },
    {
        title: 'Simulation-Of-3D-Robotic-Arm',
        description: '3D simulation of a robotic arm manipulator with inverse kinematics solver.',
        techStack: ['Python', 'Robotics', 'OpenGL'],
        github: 'https://github.com/yourusername/robotic-arm-sim'
    }
];

const seed = async () => {
    try {
        await sequelize.sync({ force: true }); // WARNING: This drops existing tables
        await Project.bulkCreate(projects);
        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Failed to seed database:', err);
        process.exit(1);
    }
};

seed();
