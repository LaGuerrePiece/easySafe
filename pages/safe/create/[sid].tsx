import { useRouter } from 'next/router'

const Safe = () => {
    const router = useRouter()
    const {sid} = router.query

    return <p>
        Create Safe with ID: {sid} <br />
    </p>
}

export default Safe
