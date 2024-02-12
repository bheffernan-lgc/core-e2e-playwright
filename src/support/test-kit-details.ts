export const testKitDetails: { [index: string]: {[index: string]: any} } =
{
    "MGS1": {
        "dispatchCode": process.env.ENV === "dev" ? "6421" : "8417"
    },
    "CM08B": {
        "dispatchCode": process.env.ENV === "dev" ? "6561" : "8443"
    },
    "MTST": {
        "dispatchCode": process.env.ENV === "dev" ? "6439" : "8429"
    },
    "EDB1": {
        "dispatchCode": process.env.ENV === "dev" ? "6557" : "8431"
    },
    "EWB1": {
        "dispatchCode": process.env.ENV === "dev" ? "6559" : "8433"
    },
    "KDB2" : {
        "dispatchCode": process.env.ENV === "dev" ? "5789" : "5570"
    },
    "HPVT" : {
        "dispatchCode": process.env.ENV === "dev" ? "6244" : "9860"
    },
    "GLCS" : {
        "dispatchCode": process.env.ENV === "dev" ? "5281" : "0000"
    }
}