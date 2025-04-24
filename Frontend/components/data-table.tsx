"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { UserData } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export default function DataTable({ data }: { data: UserData[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<UserData>[] = [
    {
      accessorKey: "User ID",
      header: "User ID",
      cell: ({ row }) => <div>{row.getValue("User ID")}</div>,
    },
    {
      accessorKey: "Device Model",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Device Model
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("Device Model")}</div>,
    },
    {
      accessorKey: "Operating System",
      header: "OS",
      cell: ({ row }) => {
        const os = row.getValue("Operating System") as string
        return <Badge variant={os === "Android" ? "default" : "secondary"}>{os}</Badge>
      },
    },
    {
      accessorKey: "App Usage Time (min/day)",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            App Usage
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-right">{row.getValue("App Usage Time (min/day)")} min</div>,
    },
    {
      accessorKey: "Screen On Time (hours/day)",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Screen Time
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="text-right">{row.getValue("Screen On Time (hours/day)")} hrs</div>,
    },
    {
      accessorKey: "Battery Drain (mAh/day)",
      header: "Battery Drain",
      cell: ({ row }) => <div className="text-right">{row.getValue("Battery Drain (mAh/day)")} mAh</div>,
    },
    {
      accessorKey: "Number of Apps Installed",
      header: "Apps",
      cell: ({ row }) => <div className="text-right">{row.getValue("Number of Apps Installed")}</div>,
    },
    {
      accessorKey: "Data Usage (MB/day)",
      header: "Data Usage",
      cell: ({ row }) => <div className="text-right">{row.getValue("Data Usage (MB/day)")} MB</div>,
    },
    {
      accessorKey: "Age",
      header: "Age",
      cell: ({ row }) => <div className="text-right">{row.getValue("Age")}</div>,
    },
    {
      accessorKey: "Gender",
      header: "Gender",
      cell: ({ row }) => <div>{row.getValue("Gender")}</div>,
    },
    {
      accessorKey: "User Behavior Class",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Behavior Class
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const behaviorClass = Number.parseInt(row.getValue("User Behavior Class"))
        return (
          <Badge
            className="text-xs"
            variant={
              behaviorClass === 1
                ? "outline"
                : behaviorClass === 2
                  ? "secondary"
                  : behaviorClass === 3
                    ? "default"
                    : "destructive"
            }
          >
            Class {behaviorClass}
          </Badge>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by device model..."
          value={(table.getColumn("Device Model")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("Device Model")?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
