# Email Templates

A React Email template library for email development and testing built with React Email and TypeScript.

## Getting Started

### Prerequisites

- Node.js (see `.nvmrc` for version)
- Yarn package manager

### Installation

1. Install dependencies:
   ```bash
   yarn install
   ```

### Development

Start the development server to preview and edit email templates:

```bash
yarn dev
```

This will start the React Email development environment where you can view and test your email templates.

### Export Templates

To export templates for production use:

```bash
yarn export
```

This will generate static HTML and plain text versions of your email templates in the `out/` directory.

## Technology Stack

- **React Email** - Email template framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - Component framework

## Project Structure

```
├── templates/           # Email template components
│   ├── index.tsx       # Template exports
│   ├── basic.tsx       # Basic email template
│   └── transactional/  # Transactional email templates
├── src/                # Source files
├── static/             # Static assets (images, etc.)
├── coverage/           # Test coverage reports
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── .nvmrc             # Node.js version specification
```