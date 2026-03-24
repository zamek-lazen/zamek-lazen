"use client";

type MainContentProps = {
  children: React.ReactNode;
};

export function MainContent({ children }: MainContentProps) {
  return <main className="mx-auto w-full flex-1 pt-28 md:pt-32">{children}</main>;
}
