import { useRouter } from 'next/router';

function Slug(props) {
  const router = useRouter();
  const { slug } = router.query;

  return <div>Slug {slug}</div>;
}

export default Slug;
