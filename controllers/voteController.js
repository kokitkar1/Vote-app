import voteModel from "../models/voteModel.js"


// Controller For create product 
export const createCandidateController = async(req,res)=>{
    try {

        const {candidateName,candidateNumber} = req.body

        // Validation
        switch (true) {
            case !candidateName:
                return res.status(500).send({error:'candidateName is Required for Create'})

            case !candidateNumber:
                return res.status(500).send({error:'candidateNumber is Required for Create'})
        }


        const candidate = await voteModel.create({candidateName, candidateNumber})
        res.status(201).send({
            success: true,
            message: 'candidate created Successfully',
            candidate
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error while creating candidate',
            error,
        }) 
    }
}


// Controller For get product

export const getCandidateController = async (req,res)=> {
    try {
        
        const candidate = await voteModel.find({}).limit(12).sort({createdAt:-1})
        res.status(200).send({
            success: true,
            TotalCount: candidate.length,
            message: "All Candidate",
            candidate,
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error while getting candidate',
            error: error.message
        })
    }
};





// Controller for getting single product

export const getSingleCandidateController = async(req,res) => {
    try {
        const candidate = await voteModel.findOne({candidateName:req.params.candidateName})
        res.status(200).send({
            success: true,
            message: 'Single candidate Fetched',
            candidate
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error While getting single candidate',
            error
        })
    }
};



//Controller for delete product

export const deleteCandidateController = async (req,res) =>{
    try {
        await voteModel.findByIdAndDelete(req.params.cid)
        res.status(200).send({
            success: true,
            message: "Candidate Deleted Successfully"
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error while Deleting Candidate',
            error
        })
    }
}


// Controller for Update product

export const updateCandidateController = async (req,res) =>{
    try {
        const {candidateName,candidateNumber} = req.body

        switch (true) {
            case !candidateName:
                return res.status(500).send({error:'candidateName is Required for Update'})

            case !candidateNumber:
                return res.status(500).send({error:'candidateNumber is Required for Update'})
        }
        

        const candidate = await voteModel.findByIdAndUpdate(req.params.cid,{...req.body},{new:true}) 
 
        await candidate.save();
        res.status(201).send({
            success : true,
            message: "candidate Updated Successfully",
            candidate,
        })

        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error while Updating candidate',
            error,
        }) 
    }
}

