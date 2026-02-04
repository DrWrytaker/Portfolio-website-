import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize';

class Project extends Model { }

Project.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    techStack: {
        type: DataTypes.JSON,
        defaultValue: [],
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    github: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    sequelize,
    modelName: 'Project',
});

export default Project;
