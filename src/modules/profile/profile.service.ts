import { pool } from "../../db";

const createProfileIntoDB = async(payload: any) => {
    const {user_id,bio,address,phone,gender} = payload

    // const user = await pool.query(`
    //         SELECT * FROM my WHERE id=$1
    //         `,
    //     [user_id]
    // )

    // if(user.rowCount === 0){
    //     throw new Error("User Not Exists in database")
    // }

        const result = await pool.query(
  `INSERT INTO profile (bio, address, phone, gender)
   VALUES ($1, $2, $3, $4)
   RETURNING *`,
  [payload.bio, payload.address, payload.phone, payload.gender]
);

        return result
}

export const profileService = {
    createProfileIntoDB,
}