# InvestorBook

Welcome to InvestorBook, Inc! This is your first week at InvestorBook and you
are excited to build on top of the data. The dataset contains three tables:
Investors, Companies, and Investments.

## Your Task

You met with the CEO and promised to deliver a clean, fast UI for working with
the data -- in just four hours! The simplest option is to provide a basic CRUD
interface for the three tables, but you have free reign to go beyond the basic
requirement to show off your creativity and frontend wizardry.

### Basic Reqirement

Build a simple CRUD interface that lets you add, view, edit, and delete records
in the three tables.

### Just one more thing...

If the basic requirement looks easy, you can take it further! For example, you
could build a spreadsheet CRUD interface (similar to Google Sheets or Airtable)
that includes useful features like infinite scroll, collaborative editing (you
can try using Hasura Subscriptions for this), filtering, sort, search, the
ability to copy paste from another spreadsheet, etc. Most likely not _all_ of
those in 4 hours, but hopefully that gives you some inspiration. Feel free to
use any open source packages that you'd like to pull in.

## Tables

- Investors
  - id
  - name
  - photo_large
  - photo_thumbnail
- Companies
  - id
  - name
- Investments
  - id
  - amount
  - investor_id
  - company_id

## GraphQL

You can use a GraphQL client library like apollo-client to connect to the
provided Hasura server, which adds a GraphQL API on top of PostgreSQL.

## Evaluation Criteria

- Clean, modular, easy-to-maintain code
- Test coverage
  - Bonus points for tests that are short, fast, and reliable but offer an
    unexpectedly high ROI in terms of coverage.
- Performance - Every user interaction should feel fast.
