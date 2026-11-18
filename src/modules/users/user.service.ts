import bcrypt from "bcryptjs";
import { pool } from "../../db";
import type { IUpadteUser, IUser } from "./user.interface";

const createUserIntoDB = async (payload: IUser) => {

    const {name, email, password, age} = payload

    const hashPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(`
            INSERT INTO my (name,email,password,age)
            VALUES ($1,$2,$3,$4) *
            `,
            [name, email, hashPassword, age]
        )

        delete result.rows[0].password

        return result
}

const getAllUserFromDB = async() => {
    const result = await pool.query(`
            SELECT * FROM my
            `)

            return result
}

const getSingleUserFromDB = async (id: string) => {
    const result = await pool.query(`
            SELECT * FROM my WHERE id=$1
            `,
        [id]
    )
    return result
}
const updateUserDB = async(payload: IUpadteUser, id: string) => {
    const {name, password, age, is_Active} = payload

        const result = await pool.query(`
            UPDATE my
            SET 
            name = COALESCE($1, name),
            email = COALESCE($2, email),
            password = COALESCE($3, password),
            is_Active = COALESCE($4, is_Active),
            updated_At = NOW()
            WHERE id=$5 RETURNING *
            `,
            [name??null, password??null, age??null, is_Active??null, id]
        )
        return result
}

const deleteUserFRomDB = async(id: string) => {
    const result = await pool.query(`
            DELETE FROM my WHERE id=$1
            `,[id])

            return result
}


export const userService = {
    createUserIntoDB,
    getAllUserFromDB,
    getSingleUserFromDB,
    updateUserDB,
    deleteUserFRomDB
}