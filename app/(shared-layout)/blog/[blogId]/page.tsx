interface BlogIdPageProps {
    params: Promise<{ blogId: string }>;
}

export default async function BlogDetails({ params }: BlogIdPageProps) {
    const { blogId } = await params;

    return (
        <>
            <h1>{ blogId }</h1>
        </>
    )
}