import { useRouter } from "next/router";

const Secret = () => {
	const router = useRouter();
	const { pid } = router.query;

	return <p>{pid}</p>;
};

export default Secret;
