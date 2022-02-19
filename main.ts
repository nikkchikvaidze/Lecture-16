//1)--------------------------------------------------------

// Implement a utils If which accepts condition C , a truthy return type T , and a falsy
// return type F . C is expected to be either true or false while T and F can be any
// type.
// For example:
// type A = If<true, 'a', 'b'> // expected to be 'a'
// type B = If<false, 'a', 'b'> // expected to be 'b'

type If<C extends boolean, T, F> = C extends true ? T : F;

type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'

//2)--------------------------------------------------------

// Implement new type Replace<T, K, U> which will do the folloing: Replace K from T with
// U.
// For Example:

// type OccupationReplaced = Replace<User, 'occupation', boolean>;

interface User {
  id: string;
  name: string;
  age: number;
  role: "admin" | "moderator" | "user";
  occupation: string;
}

type MyReplace<T, Key extends keyof T, Value> = {
  [K in keyof T]: K extends Key ? Value : T[K];
};

type OccupationReplaced = MyReplace<User, "occupation", boolean>;

//3)-------------------------------------------------------

// Merge two types into a new type. Keys of the second type overrides keys of the first
// type.

interface User1 {
  id: string;
  name: string;
  age: number;
  role: "admin" | "moderator" | "user";
  occupation: string;
}

interface User2 {
  id: string;
  name: string;
  age: number;
  role: "a" | "b" | "c";
  isActive: boolean;
}

type Merge<T1, T2> = {
  [K in keyof T1 | keyof T2]: K extends keyof T2
    ? T2[K]
    : K extends keyof T1
    ? T1[K]
    : never;
};

type Merged = Merge<User1, User2>;

//4)----------------------------------------------------------------

// Implement a type that adds a new field to the interface. The type takes the three
// arguments. The output should be an object with the new field.

// type Test = { id: '1' }
// type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }

type AppendToObject<T, U extends string, V> = {
  [P in keyof T | U]: P extends keyof T ? T[P] : V;
};

//5)-----------------------------------------------------------------

// From T , pick a set of properties whose type are assignable to U .

// type OnlyBoolean = PickByType<{
// name: string
// count: number
// isReadonly: boolean
// isEnable: boolean
// }, boolean> // { isReadonly: boolean; isEnable: boolean; }

type PickByType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P] };

//6)-----------------------------------------------------------------

// Implement the advanced util type GetOptional<T> , which remains all the optional fields.

// type I = GetOptional<{ foo: number, bar?: string }> // expected to be { bar?: string }

type GetOptional<T> = {
  [K in keyof T as {} extends Pick<T, K> ? K : never]: T[K];
};
