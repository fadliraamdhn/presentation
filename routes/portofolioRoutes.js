import { Router } from 'express';
import upload from '../middleware/multerConfig.js';
import { renderHomePage } from '../controllers/portofolioController.js';
import { isAuthenticated, logout } from "../middleware/auth.js";
import { renderLoginPage, login } from "../controllers/loginController.js"
import { renderHomeDashboard } from '../controllers/homeDashboardController.js';
import { renderTechDashboard, addNewTech, deleteTech, renderEditTech, editTech } from '../controllers/techController.js';
import { renderExperienceDashboard, addNewExperienced, deleteExperience, renderEditExperience, editExperience } from '../controllers/experienceController.js';
import { renderProjectDashboard, addNewProject, deleteProject, renderEditProject, editProject } from '../controllers/projectController.js';
const router = Router();

router.get('/', renderHomePage);
router.get('/login', renderLoginPage);
router.post('/login', login);
router.get('/dashboard', isAuthenticated, renderHomeDashboard);
router.get('/dashboard/tech', isAuthenticated, renderTechDashboard);
router.get('/dashboard/experience', isAuthenticated, renderExperienceDashboard);
router.get('/dashboard/project', isAuthenticated, renderProjectDashboard);
router.get('/logout', logout)
router.post('/dashboard/experience', upload.single('image'), addNewExperienced)
router.post('/dashboard/experience/:id', deleteExperience)
router.post('/dashboard/project', upload.single('image'), addNewProject)
router.post('/dashboard/project/:id', deleteProject)
router.post('/dashboard/tech', upload.single('image'), addNewTech)
router.post('/dashboard/tech/:id', deleteTech)
router.get('/dashboard/edit-tech/:id', renderEditTech)
router.post('/dashboard/edit-tech/:id', upload.single('image'), editTech)
router.get('/dashboard/edit-experience/:id', renderEditExperience)
router.post('/dashboard/edit-experience/:id', upload.single('image'), editExperience)
router.get('/dashboard/edit-project/:id', renderEditProject)
router.post('/dashboard/edit-project/:id', upload.single('image'), editProject)

export default router;
