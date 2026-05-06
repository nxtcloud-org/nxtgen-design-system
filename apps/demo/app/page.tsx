import { ArrowRight, Bot, Sparkles } from "@nxtgen-org/icons";
import { Button } from "@nxtgen-org/react";
import Link from "next/link";
import { DemoNav } from "./_components/DemoNav";
import { NxtGenLogo } from "./_components/NxtGenLogo";
import { PageFooter, PageScroll, PageShell } from "./_components/PageShell";

export default function Home() {
  return (
    <PageShell>
      <DemoNav />
      <PageScroll>
        {/* Hero */}
        <section className="relative overflow-hidden px-6 py-24 md:py-32">
          <div
            className="absolute inset-0 -z-10 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at top, rgba(168,85,247,0.4), transparent 60%), radial-gradient(ellipse at bottom right, rgba(230,66,202,0.3), transparent 60%), radial-gradient(ellipse at bottom left, rgba(37,96,255,0.3), transparent 60%)",
            }}
          />
          <div className="max-w-4xl mx-auto text-center">
            <NxtGenLogo size={88} className="mx-auto mb-8" title="NxtGen" />
            <span className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm rounded-full border border-default bg-surface text-text-secondary">
              <Sparkles size={14} className="text-text-brand" />
              AI-native design system
            </span>
            <h1 className="text-5xl md:text-7xl font-brand font-bold tracking-tight leading-[1.05] mb-6">
              Build{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(135deg, #2560FF 0%, #A855F7 55%, #E642CA 100%)",
                }}
              >
                intelligent
              </span>{" "}
              interfaces
              <br />
              with restraint.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
              챗봇·에이전트·어드민을 위한 NxtGen 디자인 시스템. 토큰부터 컴포넌트까지, 한 곳에서.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button size="lg" variant="gradient" asChild>
                <Link href="/chat">
                  Chat 데모 보기
                  <ArrowRight size={18} />
                </Link>
              </Button>
              <Button size="lg" variant="secondary" asChild>
                <Link href="/components">
                  <Bot size={18} />
                  컴포넌트 둘러보기
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Highlights — 페이지 간 visual link */}
        <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-4">
          <FeatureCard
            href="/components"
            eyebrow="25 components"
            title="Components"
            desc="Actions · Inputs · Contents · Feedback · Loading · Navigation · AI-Native"
          />
          <FeatureCard
            href="/chat"
            eyebrow="Live demo"
            title="Chat Surface"
            desc="MessageBubble · AgentAvatar · StreamingText · PromptInput · ModelSelector · TokenUsageBar · ToolCallBlock · CitationLink"
            gradient
          />
        </section>

        <PageFooter />
      </PageScroll>
    </PageShell>
  );
}

function FeatureCard({
  href,
  eyebrow,
  title,
  desc,
  gradient,
}: {
  href: string;
  eyebrow: string;
  title: string;
  desc: string;
  gradient?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group block p-6 rounded-lg border transition-all duration-base ease-standard hover:shadow-md ${
        gradient
          ? "bg-gradient-brand text-on-brand border-transparent"
          : "bg-surface border-default hover:border-strong"
      }`}
    >
      <div
        className={`text-xs font-medium uppercase tracking-wider mb-2 ${
          gradient ? "opacity-80" : "text-text-tertiary"
        }`}
      >
        {eyebrow}
      </div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold tracking-[-0.01em]">{title}</h3>
        <ArrowRight
          size={18}
          className="opacity-60 group-hover:translate-x-1 transition-transform duration-fast"
        />
      </div>
      <p className={`text-sm leading-relaxed ${gradient ? "opacity-90" : "text-text-secondary"}`}>
        {desc}
      </p>
    </Link>
  );
}
