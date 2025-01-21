import { type LayoutProps } from '@/types';
import { type Metadata } from 'next';

(BigInt.prototype as any).toJSON = function () {
	return this.toString();
};

export const metadata: Metadata = {
	title: 'Turborepo Fullstack Starter',
	description: 'Turborepo Fullstack Starter Next.js App',
};

export default async function RootPageLayout(props: LayoutProps) {
	return <>{props.children}</>;
}
