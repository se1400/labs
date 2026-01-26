# Workflow for Creating New Labs

This document outlines the recommended approach for creating new labs efficiently while managing context limits.

## The 4 Specific Suggestions

### 1. **Start Fresh for Each Lab**

Instead of keeping full context from previous labs, reference the conventions document.

**How:**
- Begin each new lab session by reading:
  - `docs/lab-conventions.md` - Structure and patterns
  - `docs/test-helpers.md` - Reusable test functions
- Don't try to maintain context across multiple labs
- Trust the documented patterns instead of remembering them

**Benefits:**
- Cleaner context window
- Consistent patterns across all labs
- Faster startup for each lab

---

### 2. **Use `/workflows:plan`**

Create structured plans for each lab before building.

**How:**
- Run `/workflows:plan` at the start of each new lab
- Provide the source articles and learning objectives
- Let the planning workflow create a detailed plan document
- Use the plan as the blueprint during implementation

**The Plan Should Include:**
- Learning objectives
- Breakdown of instruction steps
- List of tests needed
- Anticipated student mistakes
- Success criteria

**Benefits:**
- Clear roadmap before coding
- Identifies gaps early
- Creates a reference document
- Prevents scope creep

---

### 3. **Modular Approach**

Work on one file at a time instead of jumping between files.

**Recommended Order:**

#### Phase 1: Planning
1. Create plan document with `/workflows:plan`
2. Review source materials
3. Define clear learning objectives

#### Phase 2: Starter Files
4. Create `starter.html` with minimal structure
5. Create `starter.css` (usually empty with comment)
6. Create `starter.js` (usually empty with comment)

#### Phase 3: Tests
7. Copy helper functions from `docs/test-helpers.md`
8. Write all test cases in `tests.js`
9. Validate test logic

#### Phase 4: Instructions
10. Write `description.md` with clear numbered steps
11. Add examples for unfamiliar syntax
12. Address common student mistakes

#### Phase 5: Validation
13. Test complete lab end-to-end
14. Verify all tests pass with correct solution
15. Check student experience

**Benefits:**
- Focus on one concern at a time
- Easier to validate each piece
- Less mental overhead
- Clear progress tracking

---

### 4. **Save Patterns**

When we create good helper functions or patterns, save them for reuse.

**Where to Save:**

**`docs/test-helpers.md`**
- New test helper functions
- Jest patterns that work well
- LiveCodes-specific solutions

**`docs/lab-conventions.md`**
- New instruction patterns
- Better ways to explain concepts
- Solutions to common problems

**How:**
- After completing each lab, review what worked well
- Document any new helpers or patterns
- Update conventions if we find better approaches
- Keep examples from real labs

**Benefits:**
- Builds institutional knowledge
- Each lab improves the next
- Reduces reinventing solutions
- Creates a growing library

---

## Practical Example: Creating a New Lab

Let's say you want to create a "JavaScript Events" lab:

### Session 1: Planning (15-20 min)
```
1. Run: /workflows:plan
2. Describe: "Create a lab teaching JavaScript event listeners using click,
   mouseover, and keypress events"
3. Provide source articles
4. Review generated plan
5. File created: docs/plans/2026-01-26-feat-javascript-events-lab-plan.md
```

### Session 2: Starter Files (10-15 min)
```
1. Read: docs/lab-conventions.md
2. Create: labs/javascript-events/starter.html
   - Basic HTML with buttons, inputs
3. Create: labs/javascript-events/starter.css
   - Empty with comment
4. Create: labs/javascript-events/starter.js
   - Empty with comment
```

### Session 3: Tests (30-45 min)
```
1. Read: docs/test-helpers.md
2. Create: labs/javascript-events/tests.js
3. Copy isLiveCodes() helper
4. Write tests for each requirement:
   - Test 1: Button has click listener
   - Test 2: Click changes text content
   - Test 3: Mouseover changes color
   - etc.
5. Validate test logic
```

### Session 4: Instructions (30-45 min)
```
1. Read: docs/lab-conventions.md (structure reference)
2. Create: labs/javascript-events/description.md
3. Write clear numbered steps
4. Add code examples for:
   - addEventListener syntax
   - Event handler functions
   - Event object usage
5. Add notes about common mistakes:
   - Forgetting to select element first
   - Wrong event name
   - Not defining handler function
```

### Session 5: Validation (15-20 min)
```
1. Run complete lab from student perspective
2. Verify all tests pass
3. Check for unclear instructions
4. Test in LiveCodes environment
5. Final review
```

### Session 6: Pattern Documentation (5-10 min)
```
1. If you created new test helpers, add to docs/test-helpers.md
2. If you found better instruction patterns, add to docs/lab-conventions.md
3. Commit changes
```

---

## Breaking Up Context Windows

If you're in a session and approaching context limits:

### Strategy 1: Complete Current Phase
- Finish the file you're working on
- Save progress
- Start fresh session for next phase
- Reference: Read the relevant docs file at start

### Strategy 2: Create Checkpoint Document
- Save a summary of decisions made so far
- List what's complete and what's next
- Store in `docs/checkpoints/[lab-name]-checkpoint.md`
- New session can read checkpoint

### Strategy 3: Use Multiple Sessions by Design
- Don't try to do all 5 phases in one session
- Plan for 2-3 sessions per lab
- Each session has clear start/end points

---

## Context Management Tips

### At Start of Each Session:
```
✅ Read relevant docs (conventions, test-helpers)
✅ Read plan document if it exists
✅ Read checkpoint if continuing work
❌ Don't try to remember previous labs
❌ Don't maintain full history
```

### During Session:
```
✅ Focus on current file only
✅ Reference docs when needed
✅ Document new patterns immediately
❌ Don't switch files frequently
❌ Don't expand scope mid-session
```

### At End of Session:
```
✅ Save any new patterns to docs
✅ Create checkpoint if incomplete
✅ Commit completed work
✅ Note what's next for future session
❌ Don't leave partially complete files
```

---

## Red Flags (When to Stop & Reset)

Stop and start fresh session if:
- You're unsure what file you're working on
- You've forgotten the original learning objectives
- You're referencing old lab details instead of conventions
- Tests are checking things not in the description
- Instructions reference things that aren't in starter files

---

## Success Metrics

A lab is complete when:
- [ ] All 5 phases finished
- [ ] All files follow conventions
- [ ] Tests validate every instruction step
- [ ] Instructions are clear and explicit
- [ ] No useless tests or instructions
- [ ] Lab tested end-to-end
- [ ] New patterns documented

---

## Quick Reference

**Before Starting:** Read `lab-conventions.md` and `test-helpers.md`

**Phase Order:** Plan → Starters → Tests → Description → Validation

**One File at a Time:** Don't jump around

**Document Patterns:** Add to docs immediately

**Fresh Sessions:** Don't carry context between labs
