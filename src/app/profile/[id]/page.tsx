export default async function IdFetcher({params}: any){
    const {id} = await params;
    return(
        <div className="flex flex-col min-h-screen items-center justify-center py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page: {id}</p>
        </div>
    )
}