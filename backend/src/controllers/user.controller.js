import User from "../models/User.js";


export async function  getRecommendedUsers(req,res) {
    try {
        const currentUserId= req.user.id;
        const currentUser=req.user
        const recommendedUser= await User.find({
            $and:[
                { //exclude cuurent user
                    _id:{$ne:currentUserId}
                 },
                 //exculde cuurent user's friend
                 {$id: {$nin:currentUser.friends}},
                 {isOnboarded:true}
            ]
        })

        res.status(200).json({
            recommendedUser
        })
         

    } catch (error) {
        console.log("error in recommended user", error.message);

        res.status(500).json({
            message:"Internal server error"
        });
    }
}     
 export async function getMyFriends(req,res) {
    
 }   