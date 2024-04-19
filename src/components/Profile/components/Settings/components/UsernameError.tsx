export default function UsernameError () {
    return (
        <span className="mt-1 text-xs text-red-400">
            <p className="font-semibold">Username has errors. It's requirements are:</p>
            <ul>
                <li> - lowercased letters and numbers. minimum: <span className="font-semibold">3</span>. maximum: <span className="font-semibold">30</span></li>
                <li> - special characters allowed: "." and "_". sequences of "." are not allowed;</li>
            </ul>
        </span>
    )
}