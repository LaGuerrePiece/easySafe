import { useRouter } from 'next/router'

const Safe = () => {
    const router = useRouter()
    const {sid} = router.query

    return <p>
        Safe ID: {sid} <br />
    </p>
}

export default Safe
