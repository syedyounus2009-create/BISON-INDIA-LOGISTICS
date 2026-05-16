import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bisonAPI } from '@/api/bisonClient'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'

export default function NewLoad() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [form, setForm] = useState({
    material_type: '',
    weight_tons: '',
    pickup_location: '',
    drop_location: '',
    offered_price: '',
    delivery_date: ''
  })

  const mutation = useMutation({
    mutationFn: (data) => bisonAPI.loads.create({
      ...data,
      weight_tons: parseFloat(data.weight_tons),
      offered_price: parseFloat(data.offered_price),
      status: 'PENDING'
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['loads'] })
      toast.success('Load posted successfully!')
      navigate('/loads')
    },
    onError: () => toast.error('Failed to post load')
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(form)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-4 -ml-2 text-gray-600"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      
      <Card>
        <CardHeader>
          <CardTitle>Post a New Load</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Material Type *</label>
              <Input 
                required 
                value={form.material_type} 
                onChange={e => setForm({...form, material_type: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Weight (Tons) *</label>
              <Input 
                type="number" 
                required 
                value={form.weight_tons} 
                onChange={e => setForm({...form, weight_tons: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Pickup Location *</label>
              <Input 
                required 
                placeholder="City, State" 
                value={form.pickup_location} 
                onChange={e => setForm({...form, pickup_location: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Drop Location *</label>
              <Input 
                required 
                placeholder="City, State" 
                value={form.drop_location} 
                onChange={e => setForm({...form, drop_location: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Offered Price (₹) *</label>
              <Input 
                type="number" 
                required 
                value={form.offered_price} 
                onChange={e => setForm({...form, offered_price: e.target.value})} 
              />
            </div>
            
            <div>
              <label className="text-sm font-medium">Delivery Date</label>
              <Input 
                type="date" 
                value={form.delivery_date} 
                onChange={e => setForm({...form, delivery_date: e.target.value})} 
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate(-1)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={mutation.isPending} className="flex-1 bg-orange-500 hover:bg-orange-600">
                {mutation.isPending ? 'Posting...' : 'Post Load'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}