import { Request, Response } from "express";
import { Project, Tag } from "../models";
import mongoose from "mongoose";
import { HttpException } from "../exceptions";

class ProjectController {
  /**
   * @desc    Get all the tags
   * @route   GET /api/projects/tags
   * @access  Admin
   */
  public async getTags(req: Request, res: Response) {
    const tags = await Tag.find({}).sort({ createdAt: "desc" });
    res.status(200).json(tags);
  }

  /**
   * @desc    Create new tag
   * @route   POST /api/projects/tags
   * @access  Admin
   */
  public async postTag(req: Request, res: Response) {
    const payload = await Tag.create(req.body);
    res.status(201).send(payload);
  }

  /**
   * @desc    Get all projects
   * @route   GET /api/projects
   * @access  Public
   */
  public async getProjects(req: Request, res: Response) {
    const payload = {
      featured: [],
      others: [],
    };

    payload.featured = await Project.find({ featured: true }).populate(
      "tags",
      "name url"
    );
    payload.others = await Project.find({ featured: false }).populate(
      "tags",
      "name url"
    );

    res.status(200).send(payload);
  }

  /**
   * @desc    Create new project
   * @route   POST /api/projects
   * @access  Admin
   */
  public async postProject(req: Request, res: Response) {
    const project = await Project.create(req.body);
    res.status(201).send(project);
  }

  /**
   * @desc    Delete a project
   * @route   POST /api/projects/:id
   * @access  Admin
   */
  public async deleteProject(req: Request, res: Response) {
    const project = await Project.findById(req.params.id);
    if (!project) throw new HttpException(404, "Project not found");

    await project.delete();
    res.status(200).send("Done");
  }

  /**
   * @desc    Update an existing project
   * @route   PUT /api/projects/:id
   * @access  Admin
   */
  public async putProject(req: Request, res: Response) {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) throw new HttpException(404, "Project not found");

    project.set(req.body);
    await project.save();
    res.status(200).send(project);
  }
}

export default ProjectController;
