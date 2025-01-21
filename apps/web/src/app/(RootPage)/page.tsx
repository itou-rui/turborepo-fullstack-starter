import { Button } from '@workspace/ui/components/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@workspace/ui/components/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@workspace/ui/components/tabs';
import { Badge } from '@workspace/ui/components/badge';
import { Server, Layout, Code2, Package, Layers, FileJson, Paintbrush } from 'lucide-react';
import { SwitchModeButton } from '@/components/Button';

export default function RootPage() {
	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800'>
			{/* Theme Toggle Button */}
			<div className='fixed top-4 right-4'>
				<SwitchModeButton />
			</div>

			{/* Hero Section */}
			<div className='container mx-auto px-4 py-16'>
				<div className='text-center max-w-3xl mx-auto'>
					<Badge className='mb-4' variant='secondary'>
						Turborepo Powered
					</Badge>
					<h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-6xl'>
						Modern <span className='text-blue-600 dark:text-blue-400'>Monorepo</span>
						<br />
						Full Stack Development Environment
					</h1>
					<p className='mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300'>
						A high-performance application platform combining Next.js, Nest.js, and Nginx. Start scalable projects
						with a well-maintained development environment.
					</p>
					<div className='mt-10 flex items-center justify-center gap-x-6'>
						<Button size='lg'>
							View Documentation
							<Layout className='ml-2 h-4 w-4' />
						</Button>
						<Button variant='outline' size='lg'>
							Check GitHub
							<Code2 className='ml-2 h-4 w-4' />
						</Button>
					</div>
				</div>
			</div>

			{/* Architecture Tabs */}
			<div className='container mx-auto px-4 py-8'>
				<Tabs defaultValue='apps' className='w-full'>
					<TabsList className='grid w-full grid-cols-2'>
						<TabsTrigger value='apps'>Applications</TabsTrigger>
						<TabsTrigger value='packages'>Packages</TabsTrigger>
					</TabsList>
					<TabsContent value='apps'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
							<Card>
								<CardHeader>
									<Layout className='h-8 w-8 text-blue-500' />
									<CardTitle className='mt-4'>Next.js</CardTitle>
									<CardDescription>
										React-based frontend. Achieves fast SSR and static generation.
									</CardDescription>
								</CardHeader>
							</Card>

							<Card>
								<CardHeader>
									<Server className='h-8 w-8 text-green-500' />
									<CardTitle className='mt-4'>Nest.js</CardTitle>
									<CardDescription>
										TypeScript-first backend. Provides robust API design and DI.
									</CardDescription>
								</CardHeader>
							</Card>

							<Card>
								<CardHeader>
									<Layers className='h-8 w-8 text-orange-500' />
									<CardTitle className='mt-4'>Nginx</CardTitle>
									<CardDescription>
										High-performance reverse proxy. Achieves efficient load balancing.
									</CardDescription>
								</CardHeader>
							</Card>
						</div>
					</TabsContent>

					<TabsContent value='packages'>
						<div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
							<Card>
								<CardHeader>
									<Package className='h-8 w-8 text-purple-500' />
									<CardTitle className='mt-4'>Shared Packages</CardTitle>
									<CardDescription>
										<ul className='list-disc list-inside'>
											<li>ESLint Config</li>
											<li>Prettier Config</li>
											<li>Jest Config</li>
										</ul>
									</CardDescription>
								</CardHeader>
							</Card>

							<Card>
								<CardHeader>
									<FileJson className='h-8 w-8 text-yellow-500' />
									<CardTitle className='mt-4'>TypeScript Config</CardTitle>
									<CardDescription>
										Provides a shared tsconfig for a type-safe development environment. Optimization with
										Critters is also introduced.
									</CardDescription>
								</CardHeader>
							</Card>

							<Card>
								<CardHeader>
									<Paintbrush className='h-8 w-8 text-pink-500' />
									<CardTitle className='mt-4'>UI Components</CardTitle>
									<CardDescription>
										Reusable components based on shadcn/ui. Achieves a consistent design system.
									</CardDescription>
								</CardHeader>
							</Card>
						</div>
					</TabsContent>
				</Tabs>
			</div>

			{/* Feature Section */}
			<div className='container mx-auto px-4 py-16'>
				<Card className='bg-gray-900 dark:bg-gray-800 text-white'>
					<CardContent className='p-8'>
						<div className='text-center'>
							<h2 className='text-3xl font-bold'>You are ready to start development</h2>
							<p className='mt-4 text-gray-300'>
								With a well-maintained development environment, you can start your project right away.
								Comprehensive development tools and the latest technologies support you.
							</p>
							<div className='mt-6 flex justify-center gap-4'>
								<Button variant='secondary' size='lg'>
									Quick Start
								</Button>
								<Button variant='outline' size='lg' className='text-white border-white hover:text-white'>
									Setup Guide
								</Button>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
