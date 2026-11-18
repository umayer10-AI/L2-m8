import type { Request, Response } from "express";
import { userService } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {

        const result = await userService.createUserIntoDB(req.body)

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: result.rows[0]
        });

        // console.log(result)
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error 
        })
    }
}

const getAllUsers =  async (req: Request, res: Response) => {
    try {

        const result = await userService.getAllUserFromDB()

        res.status(200).json({
            success: true,
            message: "Data All Showing",
            data: result.rows
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error 
        })
    }
}

const getSingleUser = async (req: Request, res: Response) => {
    try {

        const {id} = req.params
        const result = await userService.getSingleUserFromDB(id as string)

    // console.log(result)

    if(result.rowCount===0){
         return  res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Data All Showing",
            data: result.rows[0]
        })
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error 
        })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {

        const {id} = req.params
        
        const result = await userService.updateUserDB(req.body, id as string)

        if(result.rowCount===0){
           return res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        res.status(201).json({
            success: true,
            message: "User updated successfully",
            data: result.rows[0]
        });

        // console.log(result)
        
    } catch (error: any) {
       return res.status(500).json({
            success: false,
            message: error?.message,
            data: error 
        })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {

        const {id} = req.params
        
        const result = await userService.deleteUserFRomDB(id as string)
        
        if(result.rowCount===0){
            res.status(404).json({
                success: false,
                message: "User Not Found"
            })
        }

        res.status(201).json({
            success: true,
            message: "User Deleted successfully",
            data: result.rows[0]
        });
        
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            data: error 
        })
    }
}

export const userController = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}