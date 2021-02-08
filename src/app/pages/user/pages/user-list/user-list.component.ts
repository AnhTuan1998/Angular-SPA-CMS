import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '@authentication-based/shared/services';
import {Subject} from 'rxjs';
import {ResponseApi, UserInterface, ModelUserInterface} from '@authentication-based/core/interfaces';
import {switchMap, takeUntil} from 'rxjs/operators';
import {NotificationService} from '@authentication-based/notification/notification.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {

  users: UserInterface[];
  isVisible = false;
  isOkLoading = false;
  createUserForm!: FormGroup;
  searchForm!: FormGroup
  type = 'Create'
  typeSort = 'account_number'

  selectOptions = [
    {key: 'account_number', label: 'Account number', type: 'number'},
    {key: 'balance', label: 'Balance', type: 'number'},
    {key: 'firstname', label: 'First name', type: 'string'},
    {key: 'lastname', label: 'Last name', type: 'string'},
    {key: 'age', label: 'Age', type: 'number'},
    {key: 'gender', label: 'Gender', type: 'string'},
    {key: 'address', label: 'Address', type: 'string'},
    {key: 'employer', label: 'Employer', type: 'string'},
    {key: 'email', label: 'Email', type: 'string'},
    {key: 'city', label: 'City', type: 'string'},
    {key: 'state', label: 'State', type: 'string'},
  ]

  columns = [
    ...this.selectOptions,
  ]

  private destroyed$ = new Subject();

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.loadUsers();
    this.createUserForm = this.fb.group({
      account_number: [null, [Validators.required]],
      balance: [null, [Validators.required]],
      firstname: [null, [Validators.required]],
      lastname: [null, [Validators.required]],
      age: [null, [Validators.required]],
      gender: ["M", [Validators.required]],
      address: [null, [Validators.required]],
      employer: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      city: [null, [Validators.required]],
      state: [null, [Validators.required]]
    });

    this.searchForm = this.fb.group({
      field: [null, [Validators.required]],
      value: [null]
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  delete(email: string): void {
    const removeUser$ = this.userService.deleteUser(email)
      .pipe(takeUntil(this.destroyed$));
    removeUser$.subscribe(() => {
      this.notificationService.showSuccess('Delete user successful', '');
      this.loadUsers();
    }, () => {
      this.notificationService.showError('Delete user fail', '');
    });
  }

  edit(data: any): void {
    this.createUserForm = this.fb.group(data)
    this.showModal('Update')
  }

  private loadUsers(): void {
    const users$ = this.userService.loadUsers()
      .pipe(takeUntil(this.destroyed$));
    users$.subscribe((res: ResponseApi<UserInterface[]>) => {
      this.users = res.data;
    });
  }

  showModal(type = 'Create'): void {
    this.isVisible = true;
    this.type = type
  }

  submitForm(formData): void {
    for (const i in formData.controls) {
      formData.controls[i].markAsDirty();
      formData.controls[i].updateValueAndValidity();
    }
    if (formData.invalid) {
      return;
    }
    const {account_number, balance, firstname, lastname, age, gender, address, employer, email, city, state} = formData.value
    const model: ModelUserInterface = {
      account_number,
      balance,
      firstname,
      lastname,
      age,
      gender,
      address,
      employer,
      email,
      city,
      state
    };
    if (this.type === 'Create') {
      const model$ = this.userService.createUser(model)
        .pipe(takeUntil(this.destroyed$))
      model$.subscribe((res) => {
        if (res['status'] === 200) {
          this.notificationService.showSuccess('Create user successful', '');
          this.loadUsers();
          this.isVisible = false;
          formData.reset()
        } else {
          this.notificationService.showError(res.message, '');
        }
      });
    } else {
      const model$ = this.userService.updateUser(model)
        .pipe(takeUntil(this.destroyed$))
      model$.subscribe((res) => {
        if (res['status'] === 200) {
          this.notificationService.showSuccess('Update user successful', '');
          this.loadUsers();
          this.isVisible = false;
          formData.reset()
        } else {
          this.notificationService.showError(res.message, '');
        }
      });
    }
    this.isOkLoading = false;
  }

  handleOk(formData): void {
    this.isOkLoading = true;
    this.submitForm(formData)
  }

  handleCancel(formData): void {
    this.isVisible = false;
    formData.reset()
  }

  onSearch(): void {
    for (const i in this.searchForm.controls) {
      this.searchForm.controls[i].markAsDirty();
      this.searchForm.controls[i].updateValueAndValidity();
    }
    const {field, value} = this.searchForm.value
    if (!value) {
      this.loadUsers()
      return;
    }
    const model$ = this.userService.searchUser(field, value)
      .pipe(takeUntil(this.destroyed$))
    model$.subscribe((res: ResponseApi<UserInterface[]>) => {
      if (res.status === 200) {
        this.users = res.data;
      } else {
        this.notificationService.showError(res.message, '');
      }
    });
    this.searchForm.reset()
  }

  onSort(): void {
    const users$ = this.userService.loadUsers(null, null, this.typeSort)
      .pipe(takeUntil(this.destroyed$));
    users$.subscribe((res: ResponseApi<UserInterface[]>) => {
      this.users = res.data;
    });
  }
 }
