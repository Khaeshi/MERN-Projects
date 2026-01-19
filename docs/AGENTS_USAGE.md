# AGENTS.md - Rules for AI Agent Usage

## Purpose
This document defines the rules and guidelines for using AI agents (e.g., Claude, GPT, or other LLMs) in our project/workflow. The goal is to ensure responsible, efficient, and consistent use of AI tools while maintaining quality, ethics, and collaboration. AI agents should augment human work, not replace it. You may only use specific models.

## Supported Agents
- **Claude Sonnet 4.5** (Anthropic): Primary agent for coding, writing, and analysis.
- **GPT-5** (OpenAI): Secondary agent for creative tasks or when Claude is unavailable.
- **Grok 4** (xAI): Last resort agent.

## General Rules
- **Ethical Use**: Agents must not generate harmful, biased, or illegal content. Always review outputs for accuracy and fairness.
- **Data Privacy**: Do not input sensitive or proprietary data (e.g., personal info, company secrets) into agents. Use anonymized or public data only.
- **Attribution**: Clearly attribute AI-generated content (e.g., "Generated with Claude's assistance").
- **Human Oversight**: All agent outputs must be reviewed and approved by a human before use. Agents are tools, not decision-makers.
- **No Over-Reliance**: Limit agent use to 50% of tasks per session to avoid dependency. Use agents for ideation, drafting, or automation, not final decisions.
- **Version Control**: Log agent interactions in project notes or commits (e.g., "Used Claude for initial code draft").

## Usage Guidelines
### When to Use Agents
- **Coding**: For generating boilerplate code, debugging, or explaining concepts (e.g., "Write a React component for a cart sidebar").
- **Writing**: For drafting documentation, emails, or content (e.g., "Summarize this API response").
- **Analysis**: For data interpretation or brainstorming (e.g., "Suggest improvements for this UI design").
- **Automation**: For repetitive tasks like formatting or basic calculations.

### When NOT to Use Agents
- **Sensitive Decisions**: Legal, financial, or ethical choices.
- **Creative Originality**: For fully original art, music, or writing—use agents for inspiration only.
- **Real-Time Interactions**: Avoid in live customer support or urgent scenarios.
- **Unverified Info**: Do not rely on agents for facts; always cross-check.

### Best Practices
- **Prompt Engineering**: Use clear, specific prompts (e.g., "As a Next.js expert, refactor this component to use hooks").
- **Iterative Use**: Start with broad prompts, then refine (e.g., "Improve this code for performance").
- **Multi-Agent Collaboration**: If using multiple agents, assign roles (e.g., Claude for frontend, GPT for backend).
- **Feedback Loop**: After using an agent, note what worked and what didn't to improve future prompts.
- **Limits**: Cap sessions to 30 minutes; take breaks to maintain human judgment.

### Agent-Specific Rules
#### Claude
- **Strengths**: Safe, helpful for coding and reasoning.
- **Rules**:
  - Use for technical tasks only.
  - Avoid open-ended creative prompts; stick to structured queries.
  - Example Prompt: "Refactor this Next.js component to use TypeScript and improve accessibility."

#### GPT-4
- **Strengths**: Versatile for creative and conversational tasks.
- **Rules**:
  - Use for ideation or writing, but fact-check outputs.
  - Limit to non-technical tasks to avoid hallucinations.
  - Example Prompt: "Generate 5 ideas for cafe menu items, then rank them by popularity."

#### [Add More Agents Here]
- **Grok 4**: [Strong agent but no memory retention | Bad for backend | Strong on Design layout ]
  - **Rules**: 
    - For Grok usage, minimize the creation to only task specific and smaller tasks and don't use for backend. 
    - Example Prompt: Bad: "Refactor this component to use Typescript"; Good:"Improve the hero section, make it relative and responsive"

## Monitoring and Updates
- **Tracking**: Maintain a log of agent usage in [e.g., a shared Google Sheet or project issue].
- **Reviews**: Quarterly, review agent effectiveness and update rules.
- **Updates**: This document is living; propose changes via [e.g., pull requests or team meetings].

## Examples
- **Good Use**: "Use Claude to generate a basic API route for user authentication."
- **Bad Use**: "Ask GPT to make final edits on a legal contract without review."
- **Multi-Agent**: "Use Claude for code, then GPT for documentation."



## Contact
For questions or rule violations, contact [Khaesey/Team Lead] at [kagtabss@gmail.com].