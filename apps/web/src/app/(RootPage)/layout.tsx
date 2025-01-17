import { type LayoutProps } from '@/types';

(BigInt.prototype as any).toJSON = function () {
	return this.toString();
};

export default async function RootPageLayout(props: LayoutProps) {
	return <>{props.children}</>;
}
