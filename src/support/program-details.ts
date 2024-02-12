export const programDetails: { [index: string]: {[index: string]: any} } =
{
    GeneticTestMGS1SyncVisitFlowQa24: {
        reseller: "LGCGeneticTest",
        resellerId: "865",
        resellerExternalId: "ebeafbbe-1cdf-409d-b603-a6e2e0916c91",
        programId: process.env.ENV === "dev" ? 92834 : 8416,
        dispatchCode: process.env.ENV === "dev" ? 6422 : 8416
    }
}