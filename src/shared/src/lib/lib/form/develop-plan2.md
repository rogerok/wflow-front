# Form Library Development Plan

This plan outlines the development of a form library, progressing from minimal functionality to advanced features. Each
step builds upon the previous iteration, ensuring a gradual and structured implementation.

---

## **Iteration 1: Core Basics**

### **Step 1: Create the `FormField` class**

- [x] Define the `FormField` class.
    - [x] Add a `value` property to store the current value.
    - [x] Add a `setValue` method to update the value.
- [x] Implement `onChange` functionality:
    - [x] Accept a new value and call `setValue` to update it.
    - [ ] Notify observers (placeholder for future extensibility).

### **Step 2: Create the `Form` class**

- [x] Define the `Form` class.
    - [x] Add a `fields` property to store a record of field names and `FormField` instances.
    - [ ] Add a method to retrieve values from all fields.
- [ ] Implement `onSubmit` functionality:
    - [ ] Gather field values and print/log them for simplicity.

---

## **Iteration 2: Basic Validation**

### **Step 1: Add Validation to `FormField`**

- [ ] Add a `Validator` utility class.
    - [ ] Accept a Zod schema and handle the validation process.
- [ ] Integrate `Validator` into `FormField`.
    - [ ] Add an `error` property to store validation messages.
    - [ ] Add a `validate` method to validate the current value.
    - [ ] Automatically validate on `setValue`.

### **Step 2: Extend `Form` to Validate All Fields**

- [ ] Add a `validateAll` method.
    - [ ] Iterate over all fields and call their `validate` methods.
- [ ] Update `onSubmit` functionality.
    - [ ] Call `validateAll` and check for errors before proceeding.

---

## **Iteration 3: Enhancements and Reactivity**

### **Step 1: Add Reactivity**

- [ ] Use MobX `makeAutoObservable` in all classes.
- [ ] Add computed properties like `isValid` and `isDirty`.

### **Step 2: Add Advanced Field Types**

- [ ] Extend `FormField` to create specialized field classes:
    - [ ] `TextField` with trimming functionality.
    - [ ] `NumberField` with range validation.
    - [ ] `CheckboxField` with toggle capability.

### **Step 3: Async Validation**

- [ ] Extend `Validator` to accept an `asyncValidationFn`.
- [ ] Update `FormField` to call `validateAsync` on value change.

---

## **Iteration 4: Advanced Form Features**

### **Step 1: Middleware Pipeline**

- [ ] Create a `MiddlewarePipeline` class to manage middleware functions.
- [ ] Integrate it into the `Form` class for pre-submission processing.

### **Step 2: Multi-Step Forms**

#### **Functionality**:

Add support for multi-step forms.

#### **Steps**:

- [ ] Add `steps` and `currentStep` properties to `Form`.
    - [ ] `steps`: An array of step identifiers.
    - [ ] `currentStep`: An index indicating the active step.
- [ ] Implement navigation methods:
    - [ ] `nextStep`: Increment `currentStep` if not on the last step.
    - [ ] `prevStep`: Decrement `currentStep` if not on the first step.
- [ ] Validate step-specific fields:
    - [ ] Add metadata to `FormField` instances to associate them with a specific step.
    - [ ] Add a `validateStep` method to validate only the fields of the current step.
    - [ ] Prevent navigation to the next step if any fields in the current step are invalid.

### **Step 3: Dynamic Fields**

#### **Functionality**:

Allow fields to be added or removed dynamically.

#### **Steps**:

- [ ] Add `addField` and `removeField` methods to `Form`.
    - [ ] `addField`: Accept a field name and `FormField` instance, adding them to the `fields` record.
    - [ ] `removeField`: Accept a field name and remove the corresponding entry from the `fields` record.
- [ ] Ensure validation works with dynamic fields:
    - [ ] Automatically validate newly added fields.
    - [ ] Exclude removed fields from validation.
- [ ] Update state reactivity:
    - [ ] Ensure MobX reactions update appropriately when fields are added or removed.

---

## **Iteration 5: Final Polish**

- [ ] Add Documentation:
    - [ ] Create comprehensive documentation for all classes and methods.
- [ ] Test Coverage:
    - [ ] Write unit tests for all classes and methods.
- [ ] Performance Optimization:
    - [ ] Optimize MobX reactions for large forms.
- [ ] Package and Publish:
    - [ ] Prepare the library for release on NPM.

---
