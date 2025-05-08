interface AuthorHeaderProps {
    fullName: string;
}

export function AuthorHeader({ fullName }: AuthorHeaderProps) {
    return (
        <header className="flex items-center bg-[#001E2E] h-[60px]">
            <h1 className="text-white text-[1.125rem] ml-6">{fullName}</h1>
        </header>
    )
}