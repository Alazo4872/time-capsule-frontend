import * as z from "zod"

const capsuleSchema = z.object({
    title: z.string().min(1, "Needs input").max(20),
    message: z.string().min(1, "Needs input").max(500), 
    visibility: z.enum(["public","private","friends"]),
    unlockDate: z.string().transform(str => new Date(str)).refine(d => d > new Date(), { message: "Date must be in the future"}),

})

export default capsuleSchema