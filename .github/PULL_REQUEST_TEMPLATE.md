# Rules

1. Please fill in (select) all required fields.

2. To reduce the burden on the reader, please cooperate with the following formatting:
   - Emphasize important changes with **bold**
   - Enclose code blocks with ```
   - Use bullet points for long lists

## Overview (Required)

<!-- Briefly describe the changes -->

## Changes (Required)

<!--
Describe the changes in the following format:

- ### Addition of XX feature
  - Detailed change 1
  - Detailed change 2

- ### Fix of YY feature
  - Explanation of the fix
  - Effect of the fix
-->

## Review Priority (Required)

- [ ] Urgent (Review needed within the day)
- [ ] High (Review needed within 2 business days)
- [ ] Medium (Review needed within a week)
- [ ] Low (Review when you have time)

## Related Issues/Projects

- Issues
<!--
  List the issue numbers or links related to this Pull Request
  - Fixes #123
  - Related to #456
-->

- Projects

<!--
  List the project numbers or links related to this Pull Request
  - [Project A](#123)
  - [Sprint 2023/Q4](project-link)
-->

## Breaking Changes (Required)

- [ ] Yes (Describe details below)
- [ ] No

<!-- If yes, describe the countermeasures -->

## Impact Scope (Required)

<!-- Describe the impact of this Pull Request -->

- [ ] UI changes
- [ ] Database changes
- [ ] API changes
- [ ] Configuration changes
- [ ] Environment variable changes
- [ ] None (Code cleanup)

## Testing

<!-- Describe the testing performed -->

### Build/Test

- [ ] `nps build` completes successfully
- [ ] `nps docker.build` completes successfully
- [ ] `nps test` passes

### Functionality Check

- [ ] Verified in local environment
- [ ] Verified in staging environment

<!--
List the specific functionalities and steps verified
Example:
- Login functionality
  - Normal case: Able to log in with email and password
  - Error case: Error displayed with incorrect password
-->

## Screenshots

<!--
  If there are UI changes, share before/after using one of the following methods:

  1. Screenshots
  2. GIF, MP4
-->

## Deployment Steps

- [ ] Can be handled with the usual deployment steps
- [ ] Special steps required (Describe details below)

<!-- Describe if special deployment steps are needed -->

## Notes

<!--
  - Points to note for reviewers
  - Concerns in implementation
  - Additional tasks needed
  - Future issues
  etc., if any, please describe
-->
